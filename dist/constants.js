"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REG_EXPS = exports.ROUTER_MESSAGES = exports.SERVER_MESSAGES = exports.METHODS = exports.PATH = void 0;
exports.PATH = "api/users";
exports.METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};
exports.SERVER_MESSAGES = {
    routeError: "Route not found",
    serverError: "Server error",
    startServer: "Server running on port:",
};
exports.ROUTER_MESSAGES = {
    userNotFound: "User not found",
};
exports.REG_EXPS = {
    isUrlContainsUserId: "/^\\/api\\/user\\/[^/]+$/",
};
