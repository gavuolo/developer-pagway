import { PayableBody } from "@/protocols";
import payableRepository from "@/repositories/payable-repository/payable-repository";
import transactionRepository from "@/repositories/transaction-repository/transaction-repository";
import { Payable } from "@prisma/client";
import dayjs from "dayjs";

async function postPayable(
  transaction_id: number,
  user_id: number
): Promise<Payable> {
  const transaction = await transactionRepository.getTransactionById(
    user_id,
    transaction_id
  );
  const rateAndNetValue = rateAndNetValueCalculation(transaction.value);
  const payment_date = paymentDate();
  const response = {
    user_id,
    transaction_id: transaction.id,
    rate: rateAndNetValue.rate,
    net_value: rateAndNetValue.net_value,
    status: "Pendente",
    payment_date,
  };
  return await payableRepository.createPayable(response);
}

function paymentDate() {
  const teste = dayjs();
  const diaPagamento = teste.add(30, "day");
  return diaPagamento.format("DD/MM/YYYY");
}

function rateAndNetValueCalculation(value: number) {
  const transactionValue = value / 100;
  const rate = transactionValue * 0.05;
  const rateFixed = Number(rate.toFixed(2));
  const net_value = (transactionValue - rateFixed) * 100;
  return {
    rate: rateFixed,
    net_value,
  };
}

async function getPayable(user_id: number) {
  let balanceAvailable = 0;
  let forcastBalance = 0;
  const response = await payableRepository.getPayableByUserId(user_id);
  response.map((element) => {
    if (element.status === "Pendente") {
      forcastBalance += element.net_value / 100;
    }
    if (element.status === "Liquidado") {
      balanceAvailable += element.net_value / 100;
    }
    return element.net_value;
  });
  const fixedBalanceAvailable = balanceAvailable.toFixed(2);
  const fixedForcastBalance = forcastBalance.toFixed(2);
  return {
    Available: fixedBalanceAvailable,
    Forcast: fixedForcastBalance
  };
}

const payableService = {
  postPayable,
  getPayable,
};

export default payableService;
