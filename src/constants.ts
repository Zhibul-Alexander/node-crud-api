export const PATH = "/api/users";

export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const SERVER_MESSAGES = {
  routeError: "Route not found",
  serverError: "Server error",
  startServer: "Server running on port:",
};

export const ROUTER_MESSAGES = {
  userNotFound: "User not found",
  invalidUserId: "Invalid user id",
  requiredFields: "Required fields are missing",
};

export const REG_EXPS = {
  isUrlContainsUserId: /\/api\/users\/\w+/,
};
