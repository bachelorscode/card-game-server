"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.high_low_win_side = void 0;
const mongoose_1 = require("mongoose");
var high_low_win_side;
(function (high_low_win_side) {
    high_low_win_side["HIGH"] = "HIGH";
    high_low_win_side["LOW"] = "LOW";
})(high_low_win_side = exports.high_low_win_side || (exports.high_low_win_side = {}));
exports.schema = new mongoose_1.Schema({
    gameID: {
        type: mongoose_1.Types.ObjectId,
    },
    high: [
        {
            userID: mongoose_1.Types.ObjectId,
            amount: Number
        }
    ],
    low: [
        {
            userID: mongoose_1.Types.ObjectId,
            amount: Number
        }
    ],
    win_side: {
        type: String,
        enum: [high_low_win_side.HIGH, high_low_win_side.LOW]
    }
});
const HighLowModel = (0, mongoose_1.model)('HighLow', exports.schema);
exports.default = HighLowModel;
