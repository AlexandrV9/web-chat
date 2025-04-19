import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  loginValidator,
  passwordValidator,
  phoneValidator,
} from '@/shared/services/Validator';

export const INPUT_FIELDS = [
  {
    id: 'email',
    name: 'email',
    label: 'Почта',
    disabled: true,
    textError: '',
    validator: emailValidator,
  },
  {
    id: 'login',
    name: 'login',
    label: 'Логин',
    disabled: true,
    validator: loginValidator,
  },
  {
    id: 'firstName',
    name: 'firstName',
    label: 'Имя',
    disabled: true,
    validator: firstNameValidator,
  },
  {
    id: 'secondName',
    name: 'secondName',
    label: 'Фамилия',
    disabled: true,
    validator: lastNameValidator,
  },
  {
    id: 'displayName',
    name: 'displayName',
    label: 'Имя в чате',
    disabled: true,
    validator: () => '',
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'Телефон',
    disabled: true,
    validator: phoneValidator,
  },
];
