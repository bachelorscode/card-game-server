import { model, Schema, Types } from "mongoose";

export enum gameStatus {
	BIDDING = "BIDDING",
	RUNNING = "RUNNING",
	COMPLETED = "COMPLETED"
}

export interface luckySeven {
	status: gameStatus,
	bidAmount?: number,
	companyProfit?: number,
}

const schema = new Schema<luckySeven>({
	status: {
		type: String,
		enum: {
			values: ["BIDDING", "RUNNING", "COMPLETED"],
			message: "{VALUE} is not supported"
		},
		default: gameStatus.BIDDING
	},

	bidAmount: Number,
	companyProfit: Number
},

	{
		timestamps: true
	}

)

const LuckySevenModel = model<luckySeven>('LuckySeven', schema);


export default LuckySevenModel
