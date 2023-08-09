import { PayableBody } from "@/protocols";
import payableRepository from "@/repositories/payable-repository/payable-repository";
import transactionRepository from "@/repositories/transaction-repository/transaction-repository";
import { Payable } from "@prisma/client";
import dayjs from "dayjs";

async function postPayable(
  payableData: PayableBody,
  user_id: number
): Promise<Payable> {
  //buscar transação
  const transaction = await transactionRepository.getTransactionById(
    user_id,
    payableData.transaction_id
  );

  const rateAndNetValue = rateAndNetValueCalculation(transaction.value)
  const payment_date = paymentDate()
  const response = {
    transaction_id: transaction.id,
    rate: rateAndNetValue.rate,
    net_value: rateAndNetValue.net_value,
    status: "Pendente",
    payment_date,
  };
  return await payableRepository.createPayable(response);
}

function paymentDate(){
  const teste = dayjs()
  const diaPagamento = teste.add(30, 'day')
  return diaPagamento.format('DD/MM/YYYY')
}

function rateAndNetValueCalculation(value:number){
  const transactionValue = value / 100;
  const rate = transactionValue * 0.05;
  const rateFixed = Number(rate.toFixed(2));
  const net_value = (transactionValue - rateFixed) * 100;
  return {
    rate: rateFixed,
    net_value
  }
}


const payableService = {
  postPayable,
};

export default payableService;
