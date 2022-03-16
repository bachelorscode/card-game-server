import { Request, Response } from "express";
import LedgerModel, { transactionType } from "../models/ledger.model";
import UserModel from "../models/user.model";

export const depositController = async (req: Request, res: Response) => {
	const userID = req.params.userID;
	const adminID = req.user._id;
	const amount = req.body.amount

	const user = await UserModel.findById(userID)
	if (!user) return res.status(404).send('user not found')
	await LedgerModel.create({ userID, adminID, amount, transactionType: transactionType.CREDIT, message: 'cash deposit', restAmount: user.amount + amount, })
	user.amount += amount
	await user.save()
}


export const withdrawalController = async (req: Request, res: Response) => {
	const userID = req.params.userID;
	const adminID = req.user._id;
	const amount = req.body.amount

	const user = await UserModel.findById(userID)
	if (!user) return res.status(404).send('user not found')
	await LedgerModel.create({ userID, adminID, amount, transactionType: transactionType.DEBIT, message: 'cash withdrawal', restAmount: user.amount - amount, })
	user.amount -= amount
	await user.save()
}
