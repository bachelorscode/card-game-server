"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.red_black_win_side = void 0;
const mongoose_1 = require("mongoose");
var red_black_win_side;
(function (red_black_win_side) {
    red_black_win_side["RED"] = "RED";
    red_black_win_side["BLACK"] = "BLACK";
})(red_black_win_side = exports.red_black_win_side || (exports.red_black_win_side = {}));
const schema = new mongoose_1.Schema({
    gameID: {
        type: mongoose_1.Types.ObjectId,
    },
    red: [
        {
            userID: mongoose_1.Types.ObjectId,
            amount: Number
        }
    ],
    black: [
        {
            userID: mongoose_1.Types.ObjectId,
            amount: Number
        }
    ],
    win_side: {
        type: String,
        enum: [red_black_win_side.RED, red_black_win_side.BLACK]
    }
});
const RedBlackModel = (0, mongoose_1.model)('RedBlack', schema);
exports.default = RedBlackModel;
