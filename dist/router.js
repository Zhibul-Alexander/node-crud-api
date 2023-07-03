"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUser = exports.getAllUsers = void 0;
const uuid_1 = require("uuid");
const models = __importStar(require("./models"));
const constants_1 = require("./constants");
const getAllUsers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models.getAllUsers();
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(users));
    }
    catch (e) {
        console.log(e);
    }
});
exports.getAllUsers = getAllUsers;
const findUser = (request, response, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models.findUser(userId);
        if (user) {
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify(user));
        }
        else {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: constants_1.ROUTER_MESSAGES.userNotFound }));
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.findUser = findUser;
const testUser = {
    id: (0, uuid_1.v4)(),
    username: "test-username",
    age: 33333,
    hobbies: ["test-hobby"],
};
const createUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield models.createUser(testUser);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(newUser));
    }
    catch (e) {
        console.log(e);
    }
});
exports.createUser = createUser;
