import { model, Schema, Types } from "mongoose";

export interface card {
	title: string,
	red: boolean,
	black: boolean,
	high: boolean,
	low: boolean,
	odd: boolean,
	even: boolean,
	seven: boolean,
}

const schema = new Schema<card>({
	title: {
		type: String,
		required: true,
		unique: true,
	},

	red: {
		type: Boolean,
		default: false
	},
	black: {
		type: Boolean,
		default: false
	},
	odd: {
		type: Boolean,
		default: false
	},
	even: {
		type: Boolean,
		default: false
	},
	high: {
		type: Boolean,
		default: false
	},
	low: {
		type: Boolean,
		default: false
	},
	seven: {
		type: Boolean,
		default: false
	}
}
)


const CardModel = model<card>('Card', schema);

export default CardModel

