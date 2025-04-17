import { loginValidator, passwordValidator } from '@/shared/services/Validator';

export const INPUT_NAMES = {
  login: 'login',
  password: 'password',
} as const;

export const INPUT_FIELDS = [
  {
    id: INPUT_NAMES.login,
    name: INPUT_NAMES.login,
    label: 'Логин',
    type: 'text',
    textError: '',
    validator: loginValidator,
  },
  {
    id: INPUT_NAMES.password,
    name: INPUT_NAMES.password,
    label: 'Пароль',
    type: 'password',
    autocomplete: false,
    textError: '',
    validator: passwordValidator,
  },
];
