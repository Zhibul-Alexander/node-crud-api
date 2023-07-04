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
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const router_1 = require("./router");
const constants_1 = require("./constants");
const server = (0, node_http_1.createServer)((request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.url) {
            return;
        }
        if (request.url === constants_1.PATH && request.method === constants_1.METHODS.GET) {
            yield (0, router_1.getAllUsers)(request, response);
        }
        else if (request.url.match(constants_1.REG_EXPS.isUrlContainsUserId) &&
            request.method === constants_1.METHODS.GET) {
            const userId = request.url.split("/")[3];
            if (!userId) {
                return;
            }
            yield (0, router_1.findUser)(request, response, userId);
        }
        else if (request.url === constants_1.PATH && request.method === constants_1.METHODS.POST) {
            yield (0, router_1.createUser)(request, response);
        }
        else {
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: constants_1.SERVER_MESSAGES.routeError }));
        }
    }
    catch (e) {
        console.log(e);
        response.writeHead(500, { "Content-Type": "application/json" });
        response.write(JSON.stringify({ message: constants_1.SERVER_MESSAGES.serverError }));
        response.end();
    }
}));
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`${constants_1.SERVER_MESSAGES.startServer} ${PORT}`));
