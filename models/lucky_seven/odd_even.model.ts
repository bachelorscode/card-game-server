import { model, Schema, Types } from "mongoose";

export enum odd_even_win_side {
	ODD = "ODD",
	EVEN = "EVEN"
}

export interface odd_even {
	gameID: Types.ObjectId | undefined,
	odd: [{ userID: Types.ObjectId | string, amount: number}],
	even: [{ userID: Types.ObjectId | string, amount: number}],

	win_side: odd_even_win_side
}


const schema = new Schema<odd_even>({
	gameID: {
		type: Types.ObjectId
	},
	odd: [
		{
			userID: Types.ObjectId,
			amount: Number
		}
	],
	even: [
		{
			userID: Types.ObjectId,
			amount: Number
		}
	],

	win_side: {
		type: String,
		enum: [odd_even_win_side.EVEN, odd_even_win_side.ODD],
		message: '{VALUE} not supported.'
	}
})


const OddEVenModel = model<odd_even>('OddEven', schema);

export default OddEVenModel

