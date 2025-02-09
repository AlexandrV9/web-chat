import { emailValidator, firstNameValidator, lastNameValidator, loginValidator, phoneValidator } from '@/services/Validator';

export const INPUT_FIELDS = [
  {
    id: 'email',
    name: 'email',
    label: 'Почта',
    validator: emailValidator,
  },
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
    id: 'first_name',
    name: 'first_name',
    label: 'Имя',
    value: '',
    type: 'text',
    textError: '',
    validator: firstNameValidator,
  },
  {
    id: 'second_name',
    name: 'second_name',
    label: 'Фамилия',
    value: '',
    type: 'text',
    textError: '',
    validator: lastNameValidator,
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'Телефон',
    value: '',
    type: 'text',
    textError: '',
    validator: phoneValidator,
  },
  {
    id: 'password',
    name: 'password',
    label: 'Пароль',
    value: '',
    type: 'password',
    textError: '',
    autocomplete: false,
    validator: loginValidator,
  },
  {
    id: 'password-repeat',
    name: 'password-repeat',
    label: 'Пароль (ещё раз)',
    value: '',
    type: 'password',
    autocomplete: false,
    textError: 'Пароли не совпадают',
    validator: () => '',
  },
];
