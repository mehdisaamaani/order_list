import { Dispatch, SetStateAction } from "react";

type hasRegister = {
  setRegisterPage: Dispatch<SetStateAction<boolean>>;
  counterRegister: number;
  setCounterRegister: Dispatch<SetStateAction<number>>;
};

export type { hasRegister };
