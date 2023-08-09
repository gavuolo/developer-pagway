import app from "@/app";
import * as jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
import supertest from "supertest";
import { createCard, createLogin, createUser } from "../factories/user-factory";

const server = supertest(app);

beforeAll(async () => {
  await cleanDb();
});

describe("POST /user/card", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/user/card");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .post("/user/card")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if there is no session for given token", async () => {
    const emailCreated = faker.internet.email();
    const passwordCreated = faker.internet.password();
    const userWithoutSession = await createUser(emailCreated, passwordCreated);
    const token = jwt.sign(
      { userId: userWithoutSession.id },
      process.env.JWT_SECRET
    );
    const response = await server.post("/user/card").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 204 and create card", async () => {
      const emailCreated = faker.internet.email();
      const passwordCreated = faker.internet.password();
      const user = await createUser(emailCreated, passwordCreated);
      const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET);
      await createLogin(user.id, token);
      const card = createCard(user.id)
      const response = await server
        .post("/user/card")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.CREATED);
    });
  });
});
