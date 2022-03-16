import { model, Schema, Types } from "mongoose";

export enum transactionType {
	DEBIT = "DEBIT",
	CREDIT = "CREDIT"
}

export interface ledger {
	userID: Types.ObjectId | undefined | string,
	adminID?: Types.ObjectId | undefined | string,
	transactionType: transactionType,
	amount: number,
	restAmount: number,
	message?: string
	createdAt: Date,
	updatedAt: Date,
}

const schema = new Schema<ledger>({

	userID: {
		type: Types.ObjectId,
		ref: "User",
		required: true,
	},

	adminID: {
		type: Types.ObjectId,
		ref: "User",
	},

	transactionType: {
		type: String,
		enum: [transactionType.CREDIT, transactionType.DEBIT],
		message: '{VALUE} is not supported.'
	},

	amount: {
		type: Number,
	},

	restAmount: {
		type: Number
	},

	message: {
		type: String,
	}

},

	{
		"timestamps": true
	}

)


const LedgerModel = model<ledger>("Ledger", schema)

export default LedgerModel



