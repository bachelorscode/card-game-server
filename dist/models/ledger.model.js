"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionType = void 0;
const mongoose_1 = require("mongoose");
var transactionType;
(function (transactionType) {
    transactionType["DEBIT"] = "DEBIT";
    transactionType["CREDIT"] = "CREDIT";
})(transactionType = exports.transactionType || (exports.transactionType = {}));
const schema = new mongoose_1.Schema({
    userID: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    transactionType: {
        type: String,
        enum: [transactionType.CREDIT, transactionType.DEBIT],
        message: '{VALUE} is not supported.'
    },
    message: {
        type: String,
    }
}, {
    "timestamps": true
});
const LedgerModel = (0, mongoose_1.model)("Ledger", schema);
exports.default = LedgerModel;
