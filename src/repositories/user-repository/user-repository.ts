import { Prisma, User_card } from "@prisma/client";
import prisma from "../../config/database";

async function createUser(email: string, hashedPassword: string) {
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}
async function findUserByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}
async function createSession(token: string, user_id: number){
  return prisma.session.create({
    data: {
      token, user_id
    }
  })
}
async function findEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}
async function createCard(cardInformation: Omit<User_card, "id">, user_id: number) {
  return await prisma.user_card.create({
    data: {
      user_id,
      card_name: cardInformation.card_name,
      card_number: cardInformation.card_number,
      card_expiring_date: cardInformation.card_expiring_date,
      card_cvv: cardInformation.card_cvv
    },
  });
}
const userRepository = {
  createUser,
  findUserByEmail,
  createCard,
  createSession,
  findEmail
};
export default userRepository;
