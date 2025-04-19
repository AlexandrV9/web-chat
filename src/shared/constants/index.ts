export const APP_ROUTES = {
  SIGN_IN: '/',
  SIGN_UP: '/sign-up',
  CONVERSATIONS: '/messenger',
  CONVERSATION: '/messenger/:id',
  SETTINGS: '/settings',
  SERVER_ERROR: '/500',
  NOT_FOUND: '*',
} as const;

export const HOST_API = 'https://ya-praktikum.tech/api/v2';
export const HOST_RESOURCES = 'https://ya-praktikum.tech/api/v2/resources';
