import {Request, Response, NextFunction} from 'express'

export default  (req:Request , res: Response, next: NextFunction ) => {

    if(req.user.isAdmin) {
        return next()
    }
    else {
        return res.status(500).send('not an authorized admin')
    }

}