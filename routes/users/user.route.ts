import { Router } from "express";
import { depositController, withdrawalController } from "../../controllers/ledger.controller";
import { login, signup, profile } from "../../controllers/user.controller";
import isAdmin from "../../middlewares/isAdmin";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
const userRouter = Router()

userRouter.post('/login', login)
userRouter.post('/signup', signup)
userRouter.get('/profile', isAuthenticated, profile);
userRouter.post('/deposit', isAdmin, depositController)
userRouter.post('/withdrawal', isAdmin, withdrawalController)



export default userRouter
