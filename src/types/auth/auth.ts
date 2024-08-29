import { User } from "../user";

export type AuthInitialState = {
  isAuthenticated: boolean;
  accessToken: string;
  user: User | null;
};
