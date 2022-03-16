import { model, Schema, Types } from "mongoose";

export interface user {
	_id: any;
	username: string,
	amount: number,
	inBetting: number,
	mobile: string,
	active: boolean,
	password: string,
	isAdmin: boolean,
	token: string[]
}

const schema = new Schema<user>({
	username: {
		type: String,
		required: true,
		unique: true,
	},

	isAdmin: {
		type: Boolean,
		default: false
	},

	password: {
		type: String,
		required: true,
	},

	amount: {
		type: Number,
		default: 0
	},
	inBetting: {
		type: Number,
		default: 0
	},
	mobile: {
		type: String,
		required: true,
		unique: true
	},
	active: {
		type: Boolean,
		default: true
	},
	token: [
		{
			type: String
		}
	]
},
	{
		timestamps: true
	}
)


const UserModel = model<user>('User', schema);

export default UserModel

