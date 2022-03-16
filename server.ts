import Express, { json, NextFunction, Request, Response, urlencoded } from "express";
import cors from 'cors'
import { mongoose } from "@typegoose/typegoose";
import http from 'http'
import { Socket, Server } from 'socket.io';
import { Script } from "./script";
import userRouter from "./routes/users/user.route";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { adminApi } from "./routes/admin/admin_api";
import { seedCard } from "./utils";
import betController from "./controllers/bet.controller";
import { user } from "./models/user.model";

const app = Express()
const server = http.createServer(app)



app.use(json())
app.use(urlencoded({ extended: true }));
app.use(cors())

declare global {
	namespace Express {
		interface Request {
			user: user,
			token: string,
			io: Server,
		}
	}
}
app.use((req: Request, res: Response, next: NextFunction) => {
	req.io = io;
	next();
})
app.use('/admin', adminApi);
app.use('/user', userRouter);


app.post('/bet', isAuthenticated, betController);


mongoose
	.connect('mongodb://localhost/gambling-game-test')
	.then(async conn => {
		console.log('database connected')
		await seedCard()
		// ab bina accept kie v connect kar skate hai
	})
	.catch(err => {
		console.log(err)
		console.log('database conection error')
	});

server.listen(5000, async () => {
	console.log('server is listen on 4000')
})

const io = new Server(server, {
	cors: {
		origin: "*",
		allowedHeaders: ['token'],
		methods: ['GET', 'POST', 'PATCH']
	},

})

Script(io);