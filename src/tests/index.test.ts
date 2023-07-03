import request from "supertest";

import { server } from "../index";
import { closeServer } from "../utils";
import { IUser } from "../types";

import {} from "../constants";

let TEST_USER_ID: string;
let TEST_USER: IUser;

const CORRECT_UUID = "a0e11d18-642a-4e0e-9fb3-0a3b65be07cf";
const INCORRECT_UUID = "test";

describe("DELETE USER REQUESTS", () => {
  afterAll(async () => {
    await closeServer(server);
  });

  it("Delete user with api/users/userId request", async () => {
    const response = await request(server).delete(`/api/users/${TEST_USER_ID}`);
    TEST_USER_ID = response.body.id;
    TEST_USER = response.body;

    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual(TEST_USER);
  });

  it("Delete user with not uuid id with api/users/id request", async () => {
    const res = await request(server).delete(`/api/users/${notUuidId}`);
    user = res.body;

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual(invalidIdMessage);
  });

  it("Delete user with not exist id with api/users/id request", async () => {
    const res = await request(server).delete(`/api/users/${notExistId}`);
    user = res.body;

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toEqual(notFoundMessage);
  });
});
