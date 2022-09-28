import LuckySevenModel, { gameStatus } from "./models/lucky_seven/lucky_seven.model";

import { Server, Socket } from "socket.io";
import { calculateWinner, getRandomFromArray, seed_game, sleep } from "./utils";

export const Script = (io: Server) => {
	io.on('connection', async (socket) => {
		const currentGame = await LuckySevenModel.findOne({}).sort({ createdAt: -1 });
		if (currentGame) {
			if (currentGame.status == gameStatus.BIDDING) {
				io.emit('UNSESPEND_GAME', 'From connection script');
			} else {
				io.emit('SUSPEND_GAME', 'From script');
			}
		}
	})

	const PLAY_INTERVAL = 10 * 1000;
	const CALC_INTERVAL = 30 * 1000;
	let GAME_PAUSED = false

	setInterval(async () => {
		if(GAME_PAUSED) return 
		const lastGame = await LuckySevenModel.findOne({}).sort({ createdAt: -1 })

		GAME_PAUSED = true
		if (!lastGame) {
			await seed_game(io)
			GAME_PAUSED = false
			return
		}

		if (lastGame.status === gameStatus.RUNNING) return

		if (lastGame.status === gameStatus.COMPLETED) {
			await seed_game(io)
			GAME_PAUSED = false
			return
		}


		setTimeout(async () => {
			io.emit('SUSPEND_GAME', 'From script');
			lastGame.status = gameStatus.RUNNING
			await lastGame.save()
			await sleep(3);
			await calculateWinner(io)
			lastGame.status = gameStatus.COMPLETED
			await lastGame.save()
			await sleep(20);
			await seed_game(io)
			GAME_PAUSED = false
		}, CALC_INTERVAL)

	},
		PLAY_INTERVAL)
}


