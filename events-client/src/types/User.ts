import { TEvent } from "./Event";

export type User = {
  id?: string;
  name?: string;
  events?: Events[];
};

type Events = {
  event: TEvent;
};
