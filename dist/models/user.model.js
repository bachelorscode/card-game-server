"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        default: 0
    },
    inBetting: {
        type: Number,
        default: 0
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    },
    token: [
        {
            type: String
        }
    ]
}, {
    timestamps: true
});
const UserModel = (0, mongoose_1.model)('User', schema);
exports.default = UserModel;
