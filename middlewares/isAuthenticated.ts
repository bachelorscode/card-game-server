import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';

const jwtSecretKey: string = process.env.JWT_KEY || 'some text';

export const generateJwtToken = (payload: any) => {
	const jwtToken = jwt.sign(payload, jwtSecretKey, { expiresIn: 60 * 60 * 24 * 7 })
	return jwtToken
}

export const validateJwtToken = (token: string) => {
	const decoded = jwt.verify(token, jwtSecretKey)
	return decoded
}


export const parseAuthorizationToken = (token: string) => {
	if (!token) throw new Error('authorizationToken not found')
	if (!token.includes('Bearer ')) throw new Error('invalid token Bearer must be in token')
	return token.split('Bearer ').pop()
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
	try {

		let headers: any = req.headers;

		const authorizationToken = parseAuthorizationToken(headers.authorization);
		if (!authorizationToken) return res.status(400).send('authorization token not found')

		const decoded: any = validateJwtToken(authorizationToken)
		const user = await UserModel.findById(decoded.id);

		if (!user) return res.status(404).send('your token is expired please login again.')
		if (!user.token.includes(authorizationToken)) return res.status(400).send('invalid authorization token')
		req.user = user;
		req.token = headers.authorization;
		next()
	} catch (error: any) {
		return res.status(500).send(error.message)
	}
}