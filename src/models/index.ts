import { v4 as uuidV4 } from "uuid";

import { updateDataToDB } from "../utils";

import { IUser } from "../types";

import DB from "../DB.json";

export const getAllUsers = async () => {
  return DB;
};

export const findUser = async (userId: string) => {
  return DB.find((user) => user.id === userId);
};

export const createUser = async (newUser: IUser) => {
  try {
    if (!newUser) {
      return;
    }
    const parsedUser = { ...newUser, id: uuidV4() };
    DB.push(parsedUser);
    await updateDataToDB("../DB.json", DB);
    return parsedUser;
  } catch (e) {
    console.log(e);
  }
};
