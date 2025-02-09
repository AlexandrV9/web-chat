import { loginValidator, passwordValidator } from '@/services/Validator';

export const INPUT_FIELDS = [
  {
    id: 'login',
    name: 'login',
    label: 'Логин',
    value: '',
    type: 'text',
    textError: '',
    validator: loginValidator,
  },
  {
    id: 'password',
    name: 'password',
    label: 'Пароль',
    value: '',
    type: 'password',
    autocomplete: false,
    textError: '',
    validator: passwordValidator,
  },
];
