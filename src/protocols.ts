export type ApplicationError = {
  name: string;
  message: string;
};

export type JWTPayLoad = {
  user_id: number;
};

export type LogInBody = {
  email: string;
  password: string;
};

export type TransactionBody = {
  value: number;
  description: string;
  user_card_id: number;
};

export type PayableBody = {
  transaction_id: number;
}

export type PayableCreate = {
  transaction_id: number;
  rate: number;
  net_value: number;
  status: string;
  payment_date: string;
  user_id: number;
}
