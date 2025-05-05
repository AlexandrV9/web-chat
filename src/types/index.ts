/* eslint-disable @typescript-eslint/no-explicit-any */
export type PlainObject<T = any> = {
  [key in string]: T;
};

export interface Message {
  chatId: number;
  content: string;
  file: null;
  id: number;
  isRead: boolean;
  time: string;
  type: 'message';
  userId: number;
}

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
  unreadCount: number;
  createdBy: number;
  lastMessage: {
    user: User;
    time: string;
    content: string;
  } | null;
}
