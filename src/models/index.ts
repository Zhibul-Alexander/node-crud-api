import { IUser } from "../types";

import DB from "../DB.json";

export const getAllUsers = async (): Promise<IUser[]> => {
  return DB;
};

export const findUser = async (userId: string): Promise<IUser> => {
  return DB.find((user) => user.id === userId);
};
