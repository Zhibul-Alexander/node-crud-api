import { IncomingMessage, ServerResponse } from "node:http";
import { validate } from "uuid";

import * as models from "./models";
import { getRequestBody } from "./utils";
import { ROUTER_MESSAGES } from "./constants";

import { IUser } from "./types";

export const getAllUsers = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  try {
    const users = await models.getAllUsers();

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(users));
  } catch (e) {
    console.log(e);
  }
};

export const findUser = async (
  request: IncomingMessage,
  response: ServerResponse,
  userId: string
) => {
  try {
    const user = await models.findUser(userId);

    if (user && validate(userId)) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(user));
    } else if (user && !validate(userId)) {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: ROUTER_MESSAGES.invalidUserId }));
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: ROUTER_MESSAGES.userNotFound }));
    }
  } catch (e) {
    console.log(e);
  }
};

export const createUser = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  try {
    const requestBody = await getRequestBody(request);
    const { username, age, hobbies } = JSON.parse(requestBody as string);
    const user: IUser = {
      username,
      age,
      hobbies,
    };

    if (user.username && user.age && user.hobbies) {
      const createdUser = await models.createUser(user);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(createdUser));
    } else {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: ROUTER_MESSAGES.requiredFields }));
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateUser = async (
  request: IncomingMessage,
  response: ServerResponse,
  userId: string
) => {
  try {
    const user = await models.findUser(userId);

    if (user && validate(userId)) {
      const requestBody = await getRequestBody(request);
      const { username, age, hobbies } = JSON.parse(requestBody as string);
      const newUserData: IUser = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const updatedUser = await models.updateUser(userId, newUserData);

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(updatedUser));
    } else if (user && !validate(userId)) {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: ROUTER_MESSAGES.invalidUserId }));
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: ROUTER_MESSAGES.userNotFound }));
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async (
  request: IncomingMessage,
  response: ServerResponse,
  userId: string
) => {
  try {
    const user = await models.findUser(userId);

    if (user && validate(userId)) {
      await models.deleteUser(userId);

      response.writeHead(204, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({ message: `User with ${userId} successfully deleted` })
      );
    } else if (user && !validate(userId)) {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: ROUTER_MESSAGES.invalidUserId }));
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: ROUTER_MESSAGES.userNotFound }));
    }
  } catch (e) {
    console.log(e);
  }
};
