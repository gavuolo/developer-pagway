import { ApplicationError } from "@/protocols";

export function duplicatedEmailError(): ApplicationError {
    return {
      name: 'DuplicatedEmailError',
      message: 'There is already a user registered with this email',
    };
  }