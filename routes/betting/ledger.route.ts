import { Request, Response, Router } from 'express'
import LedgerModel, { transactionType } from '../../models/ledger.model'
import UserModel from '../../models/user.model'

const ledgerRouter = Router()

ledgerRouter.get('/:userID', async (req: Request, res: Response) => {
	const userID = req.params.userID
	const pageNumber = req.query.page as string || '0';
	const limit = req.query.limit as string || '10'
	const skip = parseInt(pageNumber) * parseInt(limit);
	let totalPage = 0;

	try {
		const user = UserModel.findById(userID)
		if (!user) return res.status(404).send('user not found')
		const documentsCount = await LedgerModel.countDocuments({ userID: userID })
		totalPage = Math.floor(documentsCount / parseInt(limit))
		const ledger = await LedgerModel.find({ userID: userID }).limit(parseInt(limit)).skip(skip).sort({ createdAt: "-1" });
		return res.status(200).send({ totalPage, pageNumber, count: ledger.length, ledger, })
	} catch (error: any) {
		return res.status(500).send(error.message);
	}
})



ledgerRouter.get('/verify/:userID', async (req: Request, res: Response) => {
	const userID = req.params.userID
	const user = await UserModel.findById(userID)
	if (!user) return res.status(404).send('user not found')

	const ledgers = await LedgerModel.find({ userID })

	let sum = 0;
	for (let i = 0; i < ledgers.length; i++) {
		const ledger = ledgers[i]
		if (ledger.transactionType === transactionType.CREDIT) {
			sum += ledger.amount
		} else {
			sum -= ledger.amount
		}
	}

	return res.send({ userCurrentAmount: user.amount, sum })

})

ledgerRouter.get('/admin/:adminID', async (req: Request, res: Response) => {
	const adminID = req.params.adminID
	const pageNumber = req.query.page as string || '0';
	const limit = req.query.limit as string || '10'
	const skip = parseInt(pageNumber) * parseInt(limit);
	let totalPage = 0;

	try {
		const user = UserModel.findById(adminID)
		if (!user) return res.status(404).send('user not found')
		const documentsCount = await LedgerModel.countDocuments({ adminID })
		totalPage = Math.floor(documentsCount / parseInt(limit))
		const ledger = await LedgerModel.find({ adminID }).limit(parseInt(limit)).skip(skip).sort({ createdAt: "-1" });

		return res.status(200).send({ totalPage, pageNumber, count: ledger.length, ledger, })
	} catch (error: any) {
		return res.status(500).send(error.message);
	}
})


ledgerRouter.get('/admin/verify/:adminID', async (req: Request, res: Response) => {
	const adminID = req.params.adminID
	const user = await UserModel.findById(adminID)
	if (!user) return res.status(404).send('user not found')

	const ledgers = await LedgerModel.find({ adminID })

	let sum = 0;
	for (let i = 0; i < ledgers.length; i++) {
		const ledger = ledgers[i]
		if (ledger.transactionType === transactionType.CREDIT) {
			sum += ledger.amount
		} else {
			sum -= ledger.amount
		}
	}

	return res.send({ leftAmount: sum })

})



export default ledgerRouter



