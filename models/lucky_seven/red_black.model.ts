import { model, Schema, Types } from "mongoose";


export enum red_black_win_side {
	RED = "RED",
	BLACK = "BLACK"
}

export interface red_black {
	gameID: Types.ObjectId | undefined,
	red: [{ userID: Types.ObjectId | string, amount: number}],
	black: [{ userID: Types.ObjectId | string, amount: number}],
	win_side: red_black_win_side
}

const schema = new Schema<red_black>({
	gameID: {
		type: Types.ObjectId,
	},
	red: [
		{
			userID: Types.ObjectId,
			amount: Number
		}
	],
	black: [
		{
			userID: Types.ObjectId,
			amount: Number
		}
	],

	win_side: {
		type: String,
		enum: [red_black_win_side.RED, red_black_win_side.BLACK]
	}
})


const RedBlackModel = model<red_black>('RedBlack', schema);

export default RedBlackModel


