import app from "@/app";
import { cleanDb } from "../helpers";
import supertest from "supertest";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { createCard, createLogin, createUser } from "../factories/user-factory";
import * as jwt from "jsonwebtoken";
import { createPayable, createTransaction } from "../factories/transaction-factory";

const server = supertest(app);

beforeAll(async () => {
  await cleanDb();
});

describe("POST /transaction", () => {
    it("should respond with status 401 if no token is given", async () => {
      const response = await server.post("/transaction");
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();
  
      const response = await server
        .post("/transaction")
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
      const response = await server.post("/transaction").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
      it("should respond with status 201 and create Transaction", async () => {
        const emailCreated = faker.internet.email();
        const passwordCreated = faker.internet.password();
        const user = await createUser(emailCreated, passwordCreated);
        const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET);
        await createLogin(user.id, token);
        const card = await createCard(user.id)
        const transaction = await createTransaction(user.id, card.id)
        const payable = await createPayable(user.id, transaction.id)
        const response = await server
          .post("/transaction")
          .set("Authorization", `Bearer ${token}`)
          .send({
            value: faker.number.float(),
            description: faker.lorem.words(),
            user_card_id: card.id
          })
        expect(response.status).toBe(httpStatus.CREATED);
      });
    });
});