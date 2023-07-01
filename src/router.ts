import * as models from "./models";

import { ROUTER_MESSAGES } from "./constants";

export const getAllUsers = async (request, response) => {
  try {
    const users = await models.getAllUsers();

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(users));
  } catch (e) {
    console.log(e);
  }
};

export const findUser = async (request, response, userId) => {
  try {
    const user = await models.findUser(userId);

    if (user) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(user));
    } else {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: ROUTER_MESSAGES.userNotFound }));
    }
  } catch (e) {
    console.log(e);
  }
};
