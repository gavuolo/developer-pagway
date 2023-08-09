import { PayableBody, PayableCreate } from "@/protocols";
import prisma from "../../config/database";
import { Payable } from "@prisma/client";

async function createPayable(response: PayableCreate) {
  return await prisma.payable.create({
    data: {
      user_id: response.user_id,
      transaction_id: response.transaction_id,
      rate: response.rate,
      net_value: response.net_value,
      status: response.status,
      payment_date: response.payment_date,
    },
  });
}

async function getPayableByUserId(user_id: number){
  return prisma.payable.findMany({
    where:{
      user_id
    }
  })
}

const payableRepository = {
  createPayable,
  getPayableByUserId
};
export default payableRepository;
