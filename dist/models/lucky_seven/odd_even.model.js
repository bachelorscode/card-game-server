"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.odd_even_win_side = void 0;
const mongoose_1 = require("mongoose");
var odd_even_win_side;
(function (odd_even_win_side) {
    odd_even_win_side["ODD"] = "ODD";
    odd_even_win_side["EVEN"] = "EVEN";
})(odd_even_win_side = exports.odd_even_win_side || (exports.odd_even_win_side = {}));
const schema = new mongoose_1.Schema({
    gameID: {
        type: mongoose_1.Types.ObjectId
    },
    odd: [
        {
            userID: mongoose_1.Types.ObjectId,
            amount: Number
        }
    ],
    even: [
        {
            userID: mongoose_1.Types.ObjectId,
            amount: Number
        }
    ],
    win_side: {
        type: String,
        enum: [odd_even_win_side.EVEN, odd_even_win_side.ODD],
        message: '{VALUE} not supported.'
    }
});
const OddEVenModel = (0, mongoose_1.model)('OddEven', schema);
exports.default = OddEVenModel;
