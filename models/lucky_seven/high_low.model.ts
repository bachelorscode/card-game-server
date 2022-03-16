import { model, Schema, Types } from "mongoose";

export enum high_low_win_side {
	HIGH = "HIGH",
	LOW = "LOW"
}

export interface high_low {
	gameID: Types.ObjectId | undefined ,
	high: [{ userID: Types.ObjectId | string, amount: Number }]
	low: [{ userID: Types.ObjectId | string, amount: Number }]
	win_side: high_low_win_side
}

export const schema = new Schema<high_low>({
	gameID: {
		type: Types.ObjectId,
	},
	high: [
		{
			userID: Types.ObjectId,
			amount: Number
		}
	],
	low: [
		{
			userID: Types.ObjectId,
			amount: Number
		}
	],

	win_side: {
		type: String,
		enum: [high_low_win_side.HIGH, high_low_win_side.LOW]
	}
})

const HighLowModel = model<high_low>('HighLow', schema);

export default HighLowModel

