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
exports.createUser = exports.findUser = exports.getAllUsers = void 0;
const uuid_1 = require("uuid");
const updateDataToDB_1 = __importDefault(require("../utils/updateDataToDB"));
const DB_json_1 = __importDefault(require("../DB.json"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return DB_json_1.default;
});
exports.getAllUsers = getAllUsers;
const findUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return DB_json_1.default.find((user) => user.id === userId);
});
exports.findUser = findUser;
const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedUser = Object.assign(Object.assign({}, newUser), { id: (0, uuid_1.v4)() });
        DB_json_1.default.push(parsedUser);
        yield (0, updateDataToDB_1.default)("../DB.json", DB_json_1.default);
        return new Promise((resolve) => resolve(parsedUser));
    }
    catch (e) {
        console.log(e);
    }
});
exports.createUser = createUser;
