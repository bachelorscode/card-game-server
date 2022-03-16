"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameStatus = void 0;
const mongoose_1 = require("mongoose");
var gameStatus;
(function (gameStatus) {
    gameStatus["BIDDING"] = "BIDDING";
    gameStatus["RUNNING"] = "RUNNING";
    gameStatus["COMPLETED"] = "COMPLETED";
})(gameStatus = exports.gameStatus || (exports.gameStatus = {}));
const schema = new mongoose_1.Schema({
    status: {
        type: String,
        enum: {
            values: ["BIDDING", "RUNNING", "COMPLETED"],
            message: "{VALUE} is not supported"
        },
        default: gameStatus.BIDDING
    },
    bidAmount: Number,
    companyProfit: Number
}, {
    timestamps: true
});
const LuckySevenModel = (0, mongoose_1.model)('LuckySeven', schema);
exports.default = LuckySevenModel;
