/* eslint-disable @typescript-eslint/no-explicit-any */
export type PlainObject<T = any> = {
  [key in string]: T;
};

export interface User {
  id: number;
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export interface Chat {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  lastMessage: {
    user: User;
    time: string;
    content: string;
  } | null;
}
