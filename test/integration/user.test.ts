import app from "@/app";
import { cleanDb } from "../helpers";
import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/user-factory";

const server = supertest(app);

beforeAll(async () => {
  await cleanDb();
});

describe("POST /user/signup", () => {
  it("Should respond with status 400 when body is not given", async () => {
    const response = await server.post("/user/signup");
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("Should respond with status 409 when user already has an account with the registered email ", async () => {
    const emailCreated = faker.internet.email();
    const passwordCreated = faker.internet.password();
    await createUser(emailCreated, passwordCreated);
    const form = {
      email: emailCreated,
      password: passwordCreated,
    };
    const response = await server.post("/user/signup").send(form);
    expect(response.status).toBe(httpStatus.CONFLICT);
    expect(response.body).toEqual({
      name: "DuplicatedEmailError",
      message: "There is already a user registered with this email",
    });
  });
  it("Should respond with status 201 when user created", async () => {
    const emailCreated = faker.internet.email();
    const passwordCreated = faker.internet.password();
    const form = {
      email: emailCreated,
      password: passwordCreated,
    };
    const response = await server.post("/user/signup").send(form);
    expect(response.status).toBe(httpStatus.CREATED);
  });
});

describe("POST /user/signin", () => {
  it("Should respond with status 400 when body is not given", async () => {
    const response = await server.post("/user/signin");
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("Should respond with status 401 when user does not have registered email", async () => {
    const emailCreated = faker.internet.email();
    const passwordCreated = faker.internet.password();
    const form = {
      email: emailCreated,
      password: passwordCreated,
    };
    const response = await server.post("/user/signin").send(form);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Should respond with status 401 when the password is wrong", async () => {
    const emailCreated = faker.internet.email();
    const passwordCreated = faker.internet.password();
    const userType = "Recepcionista";
    await createUser(emailCreated, passwordCreated);
    const randomPassword = faker.internet.password();
    const form = {
      email: emailCreated,
      password: randomPassword,
    };
    const response = await server.post("/user/signin").send(form);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Should respond with status 200 when status OK and logged in", async () => {
    const emailCreated = faker.internet.email();
    const passwordCreated = faker.internet.password();
    await createUser(emailCreated, passwordCreated);
    const form = {
      email: emailCreated,
      password: passwordCreated,
    };
    const response = await server.post("/user/signin").send(form);
    expect(response.status).toBe(httpStatus.OK);
  });
});
