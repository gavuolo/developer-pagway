import { ApplicationError } from "@/protocols";

export function cardNotFound(): ApplicationError {
  return {
    name: 'CardNotFound',
    message: 'Card Id not Found',
  };
}