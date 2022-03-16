import { Router } from "express";
import { Server } from "socket.io";
import { addMoneyToUser } from "./admin_service";


export const adminApi = Router();
adminApi.post('/add-money', addMoneyToUser);