import { Request, Response } from "express";
import { high_low_win_side } from "../models/lucky_seven/high_low.model";
import { odd_even_win_side } from "../models/lucky_seven/odd_even.model";
import { red_black_win_side } from "../models/lucky_seven/red_black.model";
import UserModel from "../models/user.model";
import { addIntoHighLow, addIntoOddEven, addIntoRedBlack } from "../utils";

const betController = async (req: Request, res: Response) => {
	const subGameType = req.query.game_type
	const { amount, side } = req.body
	const userID = req.user._id;
	const minimumAmount = 20;
	if (parseFloat(amount) < minimumAmount || parseFloat(amount) > req.user.amount + req.user.inBetting) return res.status(500).send('Insufficient amount. Betting amount should be >= 20');
	try {
		if (subGameType === "HIGH_LOW") {
			if (side === high_low_win_side.HIGH) {
				const result = await addIntoHighLow(userID, amount, high_low_win_side.HIGH)
				if (result && result.error) return res.status(500).send(result.message)
			}
			else if (side === high_low_win_side.LOW) {
				const result = await addIntoHighLow(userID, amount, high_low_win_side.LOW)
				if (result && result.error) return res.status(500).send(result.message)
			}
			else
				return res.status(500).send('invalid side')
		}

		else if (subGameType === "ODD_EVEN") {
			if (side == odd_even_win_side.ODD) {
				const result = await addIntoOddEven(userID, amount, odd_even_win_side.ODD)
				if (result && result.error) return res.status(500).send(result.message)
			}
			else if (side == odd_even_win_side.EVEN) {
				const result = await addIntoOddEven(userID, amount, odd_even_win_side.EVEN)
				if (result && result.error) return res.status(500).send(result.message)
			}
			else return res.status(500).send('invalid side')
		}

		else if (subGameType === "RED_BLACK") {
			if (side === red_black_win_side.RED) {
				const result = await addIntoRedBlack(userID, amount, red_black_win_side.RED)
				if (result && result.error) return res.status(500).send(result.message)
			}
			else if (side === red_black_win_side.BLACK) {
				const result = await addIntoRedBlack(userID, amount, red_black_win_side.BLACK)
				if (result && result.error) return res.status(500).send(result.message)
			}
			else
				return res.status(500).send('invalid bet')
		}
		else {
			return res.status(404).send('game not found')
		}
		req.user.inBetting += parseFloat(amount);
		await UserModel.findByIdAndUpdate(req.user._id, { inBetting: req.user.inBetting });
		return res.status(200).send(req.user);

	} catch (error: any) {
		return res.status(500).send(error.message)
	}

}

export default betController