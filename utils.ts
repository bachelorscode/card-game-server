import CardModel from "./models/card";
import LedgerModel, { transactionType } from "./models/ledger.model";
import HighLowModel, { high_low_win_side } from "./models/lucky_seven/high_low.model";
import LuckySevenModel, { gameStatus } from "./models/lucky_seven/lucky_seven.model";
import OddEVenModel, { odd_even_win_side } from "./models/lucky_seven/odd_even.model";
import RedBlackModel, { red_black_win_side } from "./models/lucky_seven/red_black.model";
import UserModel from "./models/user.model";

const allCards = [
    'CLUB_1.svg', 'CLUB_10.svg', 'CLUB_11.svg',
    'CLUB_12.svg', 'CLUB_13.svg', 'CLUB_2.svg',
    'CLUB_3.svg', 'CLUB_4.svg', 'CLUB_5.svg',
    'CLUB_6.svg', 'CLUB_7.svg', 'CLUB_8.svg',
    'CLUB_9.svg', 'DIAMOND_1.svg', 'DIAMOND_10.svg',
    'DIAMOND_11.svg', 'DIAMOND_12.svg', 'DIAMOND_13.svg',
    'DIAMOND_2.svg', 'DIAMOND_3.svg', 'DIAMOND_4.svg',
    'DIAMOND_5.svg', 'DIAMOND_6.svg', 'DIAMOND_7.svg',
    'DIAMOND_8.svg', 'DIAMOND_9.svg', 'HEART_1.svg',
    'HEART_10.svg', 'HEART_11.svg', 'HEART_12.svg',
    'HEART_13.svg', 'HEART_2.svg', 'HEART_3.svg',
    'HEART_4.svg', 'HEART_5.svg', 'HEART_6.svg',
    'HEART_7.svg', 'HEART_8.svg', 'HEART_9.svg',
    'SPADE_1.svg', 'SPADE_10.svg', 'SPADE_11.svg',
    'SPADE_12.svg', 'SPADE_13.svg', 'SPADE_2.svg',
    'SPADE_3.svg', 'SPADE_4.svg', 'SPADE_5.svg',
    'SPADE_6.svg', 'SPADE_7.svg', 'SPADE_8.svg',
    'SPADE_9.svg'
]

export const addIntoHighLow = async (userID: string, amount: number, side: high_low_win_side) => {
	const lastGame = await LuckySevenModel.findOne({}).sort({ createdAt: -1 })
	if (!lastGame) return { error: true, message: "game not found" }
	if (lastGame.status === gameStatus.COMPLETED) return { error: true, message: "game already completed" }
	if (lastGame.status === gameStatus.RUNNING) return { error: true, message: "game suspended" }
	if (lastGame.status === gameStatus.BIDDING) {

		const subGame = await HighLowModel.findOne({ gameID: lastGame._id })
		if (!subGame) throw new Error('')

		if (side === high_low_win_side.HIGH) {
			subGame.high.push({ userID, amount })
			await subGame.save()
		}
		else if (side === high_low_win_side.LOW) {
			subGame.low.push({ userID, amount })
			await subGame.save()
		}
		else {
			return { error: true, message: 'farji choice' }
		}
	}
}

export const addIntoOddEven = async (userID: string, amount: number, side: odd_even_win_side) => {
	const lastGame = await LuckySevenModel.findOne({}).sort({ createdAt: -1 })
	if (!lastGame) return { error: true, message: "game not found" }
	if (lastGame.status === gameStatus.COMPLETED) return { error: true, message: "game already completed" }
	if (lastGame.status === gameStatus.RUNNING) return { error: true, message: "game suspended" }
	if (lastGame.status === gameStatus.BIDDING) {

		const subGame = await OddEVenModel.findOne({ gameID: lastGame._id })
		if (!subGame) return { error: true, message: "subgame not found" }

		if (side === odd_even_win_side.ODD) {
			subGame.odd.push({ userID, amount })
			await subGame.save()
		}
		else if (side === odd_even_win_side.EVEN) {
			subGame.even.push({ userID, amount })
			await subGame.save()
		}
		else {
			return { error: true, message: 'farji choice' }
		}
	}

}

export const addIntoRedBlack = async (userID: string, amount: number, side: red_black_win_side) => {
	const lastGame = await LuckySevenModel.findOne({}).sort({ createdAt: -1 })
	if (!lastGame) return { error: true, message: "game not found" }
	if (lastGame.status === gameStatus.COMPLETED) return { error: true, message: "game already completed" }
	if (lastGame.status === gameStatus.RUNNING) return { error: true, message: "game suspended" }
	if (lastGame.status === gameStatus.BIDDING) {

		const subGame = await RedBlackModel.findOne({ gameID: lastGame._id })
		if (!subGame) return { error: true, message: "subgame not found" }

		if (side === red_black_win_side.RED) {
			subGame.red.push({ userID, amount })
			await subGame.save()
		}
		else if (side === red_black_win_side.BLACK) {
			subGame.black.push({ userID, amount })
			await subGame.save()
		}
		else {
			return { error: true, message: 'farji choice' }
		}
	}
}




// return random element from array
export const getRandomFromArray = (arr: any[]) => {
	const index = Math.floor(Math.random() * arr.length);
	return arr[index]
}

// return number from start to end - 1 
export const getRandomNumber = (start: number = 0, end: number = 100): number => {
	let number = Math.floor(Math.random() * end)
	if (number < start) {
		number += start
	}
	return number
}

//  it have to run one times
export async function seedCard() {
    const isCardInDatabase = await CardModel.find({})
    if(isCardInDatabase.length === 52) return ;
    if(isCardInDatabase.length !== 52) {
        await CardModel.deleteMany({})
    }

	const allCardName = allCards
    	for (let i = 0; i < allCardName.length; i++) {

		const cardName = allCardName[i]
		const cardType = cardName.split('_')[0]
		const cardNumber = parseInt(cardName.split('_')[1].split('.')[0])

		await CardModel.create({
			title: cardName,
			high: cardNumber > 7,
			low: cardNumber < 7,
			seven: cardNumber === 7,
			red: (cardType === "HEART" || cardType === "DIAMOND"),
			black: (cardType === "SPADE" || cardType === "CLUB"),
			odd: cardNumber % 2 !== 0,
			even: cardNumber % 2 === 0
		})
	}
	const cards = await CardModel.find({})
	console.log(cards)
}

export const calculateWinner = async (io :any) => {
		console.log('calling this one')
		const currentGame = await LuckySevenModel.findOne({}).sort({ createdAt: -1 })
		if (!currentGame) return

		const highLowData = (await HighLowModel.aggregate([
			{
				$match: { gameID: currentGame._id },
			},
			{
				$project: {
					high: 1,
					low: 1,
					totalLowSum: { $sum: "$low.amount" },
					totalHighSum: { $sum: "$high.amount" }
				}
			},
			{
				$addFields: {
					highHigher: { $gte: ["$totalHighSum", "$totalLowSum"] },
				}
			}
		]))[0]

		const redBlackData = (await RedBlackModel.aggregate([
			{
				$match: { gameID: currentGame._id },
			},
			{
				$project: {
					red: 1,
					black: 1,
					totalRedSum: { $sum: "$red.amount" },
					totalBlackSum: { $sum: "$black.amount" }
				}
			},
			{
				$addFields: {
					redHigher: { $gte: ["$totalRedSum", "$totalBlackSum"] },
				}
			}
		]))[0]
		const oddEvenData = (await OddEVenModel.aggregate([
			{
				$match: { gameID: currentGame._id },
			},
			{
				$project: {
					odd: 1,
					even: 1,
					totalOddSum: { $sum: "$odd.amount" },
					totalEvenSum: { $sum: "$even.amount" },
				}
			},

			{
				$addFields: {
					oddHigher: { $gte: ["$totalOddSum", "$totalEvenSum"] },
				}
			}

		]))[0]


		if (!highLowData || !redBlackData || !oddEvenData) return { error: 'some game not found' };

		const query= { high: true, red: true, odd: true, seven: false }


		if (highLowData.highHigher) query.high = false
		if (redBlackData.redHigher) query.red = false
		if (oddEvenData.oddHigher) query.odd = false

		const winnerCards = await CardModel.find(query)
		const winnerCard = getRandomFromArray(winnerCards)
		io.emit('WINNER_ID', winnerCard.title)

		for (let i = 0; i < highLowData.high.length; i++) {
			const data = highLowData.high[i]
			const user = await UserModel.findById(data.userID)
			if (user) {
				if (query.high === true) {
					user.amount += data.amount
					await LedgerModel.create({ userID: user._id, amount: data.amount, transactionType: transactionType.CREDIT, message: "credited in high low game", restAmount: user.amount })
				} else {
					user.amount -= data.amount
					await LedgerModel.create({ userID: user._id, amount: data.amount, transactionType: transactionType.DEBIT, message: "debited in high low game", restAmount: user.amount })
				}
				user.inBetting -= data.amount
				await user.save()
			}
		}
		for (let i = 0; i < highLowData.low.length; i++) {
			const data = highLowData.low[i]
			const user = await UserModel.findById(data.userID)
			if (user) {
				if (query.high === true) {
					user.amount -= data.amount
					await LedgerModel.create({ userID: user._id, amount: data.amount, transactionType: transactionType.DEBIT, message: "debited in high low game", restAmount: user.amount })
				} else {
					user.amount += data.amount
					await LedgerModel.create({ userID: user._id, amount: data.amount, transactionType: transactionType.CREDIT, message: "credited in high low game", restAmount: user.amount })
				}
				user.inBetting -= data.amount
				await user.save()
			}
		}

		for (let i = 0; i < redBlackData.red.length; i++) {
			const data = redBlackData.red[i]
			const user = await UserModel.findById(data.userID)
			if (user) {
				if (query.red === true) {
					user.amount += data.amount
					await LedgerModel.create({ userID: user._id, amount: data.amount, transactionType: transactionType.CREDIT, message: "credited in red black game", restAmount: user.amount })
				} else {
					user.amount -= data.amount
					await LedgerModel.create({ userID: user._id, amount: data.amount, transactionType: transactionType.DEBIT, message: "debited in red black game", restAmount: user.amount })
				}
				user.inBetting -= data.amount
				await user.save()
			}
		}
		for (let i = 0; i < redBlackData.black.length; i++) {
			const data = redBlackData.black[i]
			const user = await UserModel.findById(data.userID)
			if (user) {
				if (query.red === true) {
					user.amount -= data.amount
					await LedgerModel.create({ userID: user._id, amount: data.amount, transactionType: transactionType.DEBIT, message: "debited in red black game", restAmount: user.amount })
				} else {
					user.amount += data.amount
					await LedgerModel.create({ userID: user._id, amount: data.amount, transactionType: transactionType.CREDIT, message: "credited in red black game", restAmount: user.amount })
				}
				user.inBetting -= data.amount
				await user.save()
			}
		}

		for (let i = 0; i < oddEvenData.odd.length; i++) {
			const data = oddEvenData.odd[i]
			const user = await UserModel.findById(data.userID)
			if (user) {
				if (query.odd === true) {
					user.amount += data.amount
					await LedgerModel.create({ userID: user._id, amount: data.amount, transactionType: transactionType.CREDIT, message: "credited in red black game", restAmount: user.amount })
				} else {
					user.amount -= data.amount
					await LedgerModel.create({ userID: user._id, amount: data.amount, transactionType: transactionType.DEBIT, message: "debited in red black game", restAmount: user.amount })
				}
				user.inBetting -= data.amount
				await user.save()
			}
		}
		for (let i = 0; i < oddEvenData.even.length; i++) {
			const data = oddEvenData.even[i]
			const user = await UserModel.findById(data.userID)
			if (user) {
				if (query.high === true) {
					user.amount -= data.amount
					await LedgerModel.create({ userID: user._id, amount: data.amount, transactionType: transactionType.DEBIT, message: "debited in  odd even game", restAmount: user.amount })
				} else {
					await LedgerModel.create({ userID: user._id, amount: data.amount, transactionType: transactionType.CREDIT, message: "credited in odd even game", restAmount: user.amount })
					user.amount += data.amount
				}
				user.inBetting -= data.amount
				await user.save()
			}
		}

		return
	}

 export const seed_game = async (io: any) => {
		console.log('creating new game')
		const game = await LuckySevenModel.create({})
		await HighLowModel.create({ gameID: game._id })
		await OddEVenModel.create({ gameID: game._id })
		await RedBlackModel.create({ gameID: game._id })
		console.log('new game created')
		io.emit('UNSESPEND_GAME', 'From script');
	}

export	const clear_database = async () => {
		console.log('clearing database')
		await LuckySevenModel.deleteMany({})
		await HighLowModel.deleteMany({})
		await OddEVenModel.deleteMany({})
		await RedBlackModel.deleteMany({})
		console.log('database cleared')
	}

export	const sleep = (timer: number) => {
		return new Promise(resolve => {
			setTimeout(resolve, timer*1000)
		})
	}