import { v4 as uuidV4 } from "uuid";

import { updateDataToDB } from "../utils";

import { IUser } from "../types";

import DB from "../DB.json";

export const getAllUsers = async () => {
  return Promise.resolve(DB);
};

export const findUser = async (userId: string) => {
  return Promise.resolve(DB.find((user) => user.id === userId));
};

export const createUser = async (newUser: IUser) => {
  try {
    if (!newUser) {
      return;
    }
    const parsedUser = { ...newUser, id: uuidV4() };
    DB.push(parsedUser);
    await updateDataToDB("../DB.json", DB);
    return Promise.resolve(parsedUser);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const updateUser = async (userId: string, user: IUser) => {
  try {
    const userIndex: number = DB.findIndex((user) => user.id === userId);
    DB[userIndex] = { ...user, id: userId };
    await updateDataToDB("../DB.json", DB);
    return Promise.resolve(DB[userIndex]);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const DBWithoutUser = DB.filter((user) => user.id !== userId);
    await updateDataToDB("../DB.json", DBWithoutUser);
    return Promise.resolve(DB);
  } catch (e) {
    return Promise.reject(e);
  }
};
