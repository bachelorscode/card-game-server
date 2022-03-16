import { model, Schema, Types } from "mongoose";

export interface admin {
	username: string,
	amount: number,
	inBetting: number,
	mobile: string,
	active: boolean,
	password: string,
	token: string[]
}

const schema = new Schema<admin>({
	username: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
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


const AdminModel= model<admin>('Admin', schema);

export default AdminModel

