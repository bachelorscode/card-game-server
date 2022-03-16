"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const betLagao = () => __awaiter(void 0, void 0, void 0, function* () {
    const game_type = ["HIGH_LOW", "ODD_EVEN", "RED_BLACK"];
    const selectedGame = game_type[Math.floor(Math.random() * 3)];
    let side = "";
    const a = (Math.floor(Math.random() * 10));
    if (selectedGame === "HIGH_LOW") {
        if (a % 2 === 0) {
            side = "HIGH";
        }
        else {
            side = "LOW";
        }
    }
    if (selectedGame === "ODD_EVEN") {
        if (a % 2 === 0) {
            side = "ODD";
        }
        else
            side = "EVEN";
    }
    if (selectedGame === "RED_BLACK") {
        if (a % 2 === 0)
            side = "RED";
        else
            side = "BLACK";
    }
    console.log(side, selectedGame);
    try {
        const { data } = yield axios_1.default.post(`http://localhost:5000/bet?game_type=${selectedGame}`, {
            userId: '62078860dd6995c6592e71b1',
            amount: Math.floor(Math.random() * 100) + 100,
            side
        });
        console.log(data, 'data');
    }
    catch (error) {
        if (error.response) {
            console.log(error.response.data);
        }
        else {
            error.message;
        }
    }
});
setInterval(() => {
    betLagao();
}, 4000);
