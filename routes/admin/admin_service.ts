import { Request, Response } from "express";
import UserModel from "../../models/user.model";

export const addMoneyToUser = async (req: Request, res: Response) => {
    try {
        let { money, userId } = req.body;
        let user = await UserModel.findOne({ username: userId });
        console.log('From this ');

        console.log(parseFloat(money));

        if (parseFloat(money) < 0 || parseFloat(money) == 0) return res.status(500).send("Invalid amount");
        if (!user) return res.status(404).send('user not found');
        user.amount += parseFloat(money);
        console.log(user);
        await user.save();
        req.io.emit('AMOUNT_UPDATED' + user._id, JSON.stringify(user));
        res.status(200).send("amount updated");
    } catch (error: any) {
        res.status(500).send(error.message)
    }
}