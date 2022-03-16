"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const lucky_seven_model_1 = __importStar(require("./models/lucky_seven/lucky_seven.model"));
const typegoose_1 = require("@typegoose/typegoose");
const high_low_model_1 = __importStar(require("./models/lucky_seven/high_low.model"));
const odd_even_model_1 = __importStar(require("./models/lucky_seven/odd_even.model"));
const red_black_model_1 = __importStar(require("./models/lucky_seven/red_black.model"));
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use((0, cors_1.default)());
const addIntoHighLow = (userID, amount, side) => __awaiter(void 0, void 0, void 0, function* () {
    const lastGame = yield lucky_seven_model_1.default.findOne({}).sort({ createdAt: -1 });
    if (!lastGame)
        return { error: true, message: "game not found" };
    if (lastGame.status === lucky_seven_model_1.gameStatus.COMPLETED)
        return { error: true, message: "game already completed" };
    if (lastGame.status === lucky_seven_model_1.gameStatus.RUNNING)
        return { error: true, message: "game suspended" };
    if (lastGame.status === lucky_seven_model_1.gameStatus.BIDDING) {
        const subGame = yield high_low_model_1.default.findOne({ gameID: lastGame._id });
        if (!subGame)
            throw new Error('');
        if (side === high_low_model_1.high_low_win_side.HIGH) {
            subGame.high.push({ userID, amount });
            yield subGame.save();
        }
        else if (side === high_low_model_1.high_low_win_side.LOW) {
            subGame.low.push({ userID, amount });
            yield subGame.save();
        }
        else {
            return { error: true, message: 'farji choice' };
        }
    }
});
const addIntoOddEven = (userID, amount, side) => __awaiter(void 0, void 0, void 0, function* () {
    const lastGame = yield lucky_seven_model_1.default.findOne({}).sort({ createdAt: -1 });
    if (!lastGame)
        return { error: true, message: "game not found" };
    if (lastGame.status === lucky_seven_model_1.gameStatus.COMPLETED)
        return { error: true, message: "game already completed" };
    if (lastGame.status === lucky_seven_model_1.gameStatus.RUNNING)
        return { error: true, message: "game suspended" };
    if (lastGame.status === lucky_seven_model_1.gameStatus.BIDDING) {
        const subGame = yield odd_even_model_1.default.findOne({ gameID: lastGame._id });
        if (!subGame)
            return { error: true, message: "subgame not found" };
        if (side === odd_even_model_1.odd_even_win_side.ODD) {
            subGame.odd.push({ userID, amount });
            yield subGame.save();
        }
        else if (side === odd_even_model_1.odd_even_win_side.EVEN) {
            subGame.even.push({ userID, amount });
            yield subGame.save();
        }
        else {
            return { error: true, message: 'farji choice' };
        }
    }
});
const addIntoRedBlack = (userID, amount, side) => __awaiter(void 0, void 0, void 0, function* () {
    const lastGame = yield lucky_seven_model_1.default.findOne({}).sort({ createdAt: -1 });
    if (!lastGame)
        return { error: true, message: "game not found" };
    if (lastGame.status === lucky_seven_model_1.gameStatus.COMPLETED)
        return { error: true, message: "game already completed" };
    if (lastGame.status === lucky_seven_model_1.gameStatus.RUNNING)
        return { error: true, message: "game suspended" };
    if (lastGame.status === lucky_seven_model_1.gameStatus.BIDDING) {
        const subGame = yield red_black_model_1.default.findOne({ gameID: lastGame._id });
        if (!subGame)
            return { error: true, message: "subgame not found" };
        if (side === red_black_model_1.red_black_win_side.RED) {
            subGame.red.push({ userID, amount });
            yield subGame.save();
        }
        else if (side === red_black_model_1.red_black_win_side.BLACK) {
            subGame.black.push({ userID, amount });
            yield subGame.save();
        }
        else {
            return { error: true, message: 'farji choice' };
        }
    }
});
app.post('/bet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subGameType = req.query.game_type;
    const { amount, userID, side } = req.body;
    try {
        if (subGameType === "HIGH_LOW") {
            if (side === high_low_model_1.high_low_win_side.HIGH) {
                const result = yield addIntoHighLow(userID, amount, high_low_model_1.high_low_win_side.HIGH);
                if (result && result.error)
                    return res.status(500).send(result.message);
            }
            else if (side === high_low_model_1.high_low_win_side.LOW) {
                const result = yield addIntoHighLow(userID, amount, high_low_model_1.high_low_win_side.LOW);
                if (result && result.error)
                    return res.status(500).send(result.message);
            }
            else
                return res.status(500).send('invalid side');
        }
        else if (subGameType === "ODD_EVEN") {
            if (side == odd_even_model_1.odd_even_win_side.ODD) {
                const result = yield addIntoOddEven(userID, amount, odd_even_model_1.odd_even_win_side.ODD);
                if (result && result.error)
                    return res.status(500).send(result.message);
            }
            else if (side == odd_even_model_1.odd_even_win_side.EVEN) {
                const result = yield addIntoOddEven(userID, amount, odd_even_model_1.odd_even_win_side.EVEN);
                if (result && result.error)
                    return res.status(500).send(result.message);
            }
            else
                return res.status(500).send('invalid side');
        }
        else if (subGameType === "RED_BLACK") {
            if (side === red_black_model_1.red_black_win_side.RED) {
                const result = yield addIntoRedBlack(userID, amount, red_black_model_1.red_black_win_side.RED);
                if (result && result.error)
                    return res.status(500).send(result.message);
            }
            else if (side === red_black_model_1.red_black_win_side.BLACK) {
                const result = yield addIntoRedBlack(userID, amount, red_black_model_1.red_black_win_side.BLACK);
                if (result && result.error)
                    return res.status(500).send(result.message);
            }
            else
                return res.status(500).send('invalid bet');
        }
        else {
            return res.status(404).send('game not found');
        }
        return res.status(200).send('betting done ');
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
app.get('/hello', (req, res) => {
    return res.send('hello world');
});
typegoose_1.mongoose
    .connect('mongodb://localhost/gambling-game-test')
    .then((conn) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('database connected');
}))
    .catch(err => {
    console.log(err);
    console.log('database conection error');
});
app.listen(5000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('server is listen on 4000');
}));
