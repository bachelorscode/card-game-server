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
exports.signup = exports.login = void 0;
const bcrypt_1 = require("bcrypt");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const user_model_1 = __importDefault(require("../models/user.model"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield user_model_1.default.findOne({ $or: [{ username }, { mobile: username }] }).select(['-token']);
        if (!user)
            return res.status(404).send('username or email invalid');
        if (!(yield (0, bcrypt_1.compare)(user.password, password)))
            return res.status(400).send('invalid credentials');
        const jwtToken = (0, isAuthenticated_1.generateJwtToken)({ id: user._id });
        yield user_model_1.default.findByIdAndUpdate(user._id, { $addToSet: { token: jwtToken } });
        return res.send({ jwtToken, user });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, mobile, password } = req.body;
    try {
        const isUserExists = yield user_model_1.default.findOne({ $or: [{ username }, { mobile: username }] });
        if (isUserExists)
            return res.status(400).send('user with username or email already exists');
        const encryptedPassword = yield (0, bcrypt_1.hash)(password, 10);
        const user = yield user_model_1.default.create({ username, mobile, password: encryptedPassword });
        const jwtToken = (0, isAuthenticated_1.generateJwtToken)({ id: user._id });
        user.token.push(jwtToken);
        yield user.save();
        return res.status(201).send({ jwtToken, user });
    }
    catch (error) {
        yield user_model_1.default.findOneAndRemove({ username });
        return res.status(500).send(error.message);
    }
});
exports.signup = signup;
