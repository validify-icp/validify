import { Record } from "azle";

export type User = Record<{
    id: string;
    username: string;
    email: string;
    password: string;
    created_date: string;
    updated_at: string;
  }>;

