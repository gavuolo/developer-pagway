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
  value: string;
  description: string;
  user_card_id: number;
};
