import request from "supertest";

import { server } from "../index";
import { closeServer } from "../utils";

import { SERVER_MESSAGES } from "../constants";

describe("GET USERS REQUESTS", () => {
  afterAll(async () => {
    await closeServer(server);
  });

  it("GET ALL USERS with api/users request", async () => {
    const response = await request(server).get("/api/users");

    expect(response.statusCode).toBe(200);
  });

  it("GET ALL USERS with error api/user request", async () => {
    const response = await request(server).get("/api/user");

    expect(response.statusCode).toBe(404);
  });

  it("GET ALL USERS without some request", async () => {
    const response = await request(server).get("");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual(SERVER_MESSAGES.routeError);
  });
});
