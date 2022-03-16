import { isObject } from "@typegoose/typegoose/lib/internal/utils"
import { compare, hash } from "bcrypt"
import { Request, Response } from "express"
import { Types } from "mongoose"
import { send } from "process"
import { generateJwtToken } from "../middlewares/isAuthenticated"
import LedgerModel, { transactionType } from "../models/ledger.model"
import LuckySevenModel, { gameStatus } from "../models/lucky_seven/lucky_seven.model"
import UserModel from "../models/user.model"

export const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body
		const user = await UserModel.findOne({ $or: [{ username }, { mobile: username }] }).select(['-token'])

		if (!user) return res.status(404).send('username or email invalid')
		console.log(user);
		console.log(await compare(user.password, password));

		if (!(await compare(password, user.password))) return res.status(400).send('invalid credentials')

		const jwtToken = generateJwtToken({ id: user._id })

		await UserModel.findByIdAndUpdate(user._id, { $addToSet: { token: jwtToken } })

		return res.send({ jwtToken, user })
	} catch (error: any) {
		return res.status(500).send(error.message)
	}
}

export const signup = async (req: Request, res: Response) => {
	const { username, mobile, password } = req.body
	console.log(req.body)
	try {
		const isUserExists = await UserModel.findOne({ $or: [{ username }, { mobile: username }] })
		if (isUserExists) return res.status(400).send('user with username or email already exists')

		const encryptedPassword = await hash(password, 10)
		const user = await UserModel.create({ username, mobile, password: encryptedPassword })

		const jwtToken = generateJwtToken({ id: user._id })

		user.token.push(jwtToken)
		await user.save()

		return res.status(201).send({ jwtToken, user })
	} catch (error: any) {
		await UserModel.findOneAndRemove({ username })
		return res.status(500).send(error.message)
	}
}

export const profile = async (req: Request, res: Response) => {
	res.status(200).send(req.user);
}

// export const addMoney = async (req: Request, res: Response) => {

// 	try {
// 		const { userId, amount, message } = req.body as { userId: Types.ObjectId, amount: string, message: string };
// 		const user = await UserModel.findById(userId)
// 		if (!user) return res.status(404).send('no user found')
// 		user.amount += parseFloat(amount);
// 		if (req.user.isAdmin) {
// 			const ledger = await LedgerModel.create({ userID: userId, adminID: req.user._id, amount, transactionType: transactionType.CREDIT, message })
// 		} else {
// 			const ledger = await LedgerModel.create({ userID: userId, amount, transactionType: transactionType.CREDIT, message })
// 		}
// 		return res.status(200).send(user)

// 	} catch (error: any) {
// 		return res.status(400).send(error.message)
// 	}

// }

export const withdrawMoney = async (req: Request, res: Response) => {

	try {
		const { userId, amount, message } = req.body as { userId: Types.ObjectId, amount: string, message: string };
		const user = await UserModel.findById(userId)
		if (!user) return res.status(404).send('no user found')
		user.amount += parseFloat(amount);
		if (req.user.isAdmin) {
			const ledger = await LedgerModel.create({ userID: userId, adminID: req.user._id, amount, transactionType: transactionType.DEBIT })
		} else {
			const ledger = await LedgerModel.create({ userID: userId, amount, transactionType: transactionType.DEBIT, message })
		}
		return res.status(200).send(user)

	} catch (error: any) {
		return res.status(400).send(error.message)
	}

}

