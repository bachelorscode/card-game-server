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
const lucky_seven_model_1 = __importStar(require("./models/lucky_seven/lucky_seven.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const high_low_model_1 = __importDefault(require("./models/lucky_seven/high_low.model"));
const odd_even_model_1 = __importDefault(require("./models/lucky_seven/odd_even.model"));
const red_black_model_1 = __importDefault(require("./models/lucky_seven/red_black.model"));
const seed_game = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('creating new game');
    const game = yield lucky_seven_model_1.default.create({});
    yield high_low_model_1.default.create({ gameID: game._id });
    yield odd_even_model_1.default.create({ gameID: game._id });
    yield red_black_model_1.default.create({ gameID: game._id });
    console.log('new game created');
});
const clear_database = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('clearing database');
    yield lucky_seven_model_1.default.deleteMany({});
    yield high_low_model_1.default.deleteMany({});
    yield odd_even_model_1.default.deleteMany({});
    yield red_black_model_1.default.deleteMany({});
    console.log('database cleared');
});
const sleep = (timer) => {
    return new Promise(resolve => {
        setTimeout(resolve, timer);
    });
};
const calculateWinner = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentGame = yield lucky_seven_model_1.default.findOne({}).sort({ createdAt: -1 });
    yield sleep(10 * 1000);
    return;
});
mongoose_1.default
    .connect('mongodb://localhost/gambling-game-test')
    .then((conn) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('database connected');
    yield clear_database();
}))
    .catch(err => {
    console.log(err);
    console.log('database conection error');
});
const PLAY_INTERVAL = 30 * 1000;
const CALC_INTERVAL = 15 * 1000;
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    const lastGame = yield lucky_seven_model_1.default.findOne({}).sort({ createdAt: -1 });
    if (!lastGame) {
        yield seed_game();
        return;
    }
    if (lastGame.status === lucky_seven_model_1.gameStatus.RUNNING)
        return;
    if (lastGame.status === lucky_seven_model_1.gameStatus.COMPLETED) {
        console.log('game is already completed');
        yield seed_game();
        return;
    }
    console.log(lastGame);
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        lastGame.status = lucky_seven_model_1.gameStatus.RUNNING;
        yield lastGame.save();
        console.log(lastGame, 'after running ');
        yield calculateWinner();
        lastGame.status = lucky_seven_model_1.gameStatus.COMPLETED;
        yield lastGame.save();
        console.log(lastGame, 'after completed');
        yield seed_game();
    }), CALC_INTERVAL);
}), PLAY_INTERVAL);
