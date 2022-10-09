import { User } from "./User";

export type TEvent = {
  id?: string;
  description?: string;
  date?: Date;
  users?: Users[];
};

type Users = {
  user: User;
};
