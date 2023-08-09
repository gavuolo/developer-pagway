import { PayableBody, PayableCreate } from "@/protocols";
import prisma from "../../config/database";
import { Payable } from "@prisma/client";

async function createPayable(response: PayableCreate) {
  return await prisma.payable.create({
    data: {
      transaction_id: response.transaction_id,
      rate: response.rate,
      net_value: response.net_value,
      status: response.status,
      payment_date: response.payment_date,
    },
  });
}

const payableRepository = {
  createPayable,
};
export default payableRepository;
