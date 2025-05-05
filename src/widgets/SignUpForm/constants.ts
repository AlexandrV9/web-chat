import {
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  loginValidator,
  passwordValidator,
  phoneValidator,
} from '@/shared/services/Validator';

export const INPUT_NAMES = {
  email: 'email',
  login: 'login',
  first_name: 'first_name',
  second_name: 'second_name',
  phone: 'phone',
  password: 'password',
  password_repeat: 'password_repeat',
} as const;

export const INPUT_FIELDS = [
  {
    id: 'email',
    name: INPUT_NAMES.email,
    label: 'Почта',
    validator: emailValidator,
  },
  {
    id: 'login',
    name: INPUT_NAMES.login,
    label: 'Логин',
    type: 'text',
    textError: '',
    validator: loginValidator,
  },
  {
    id: 'first_name',
    name: INPUT_NAMES.first_name,
    label: 'Имя',
    type: 'text',
    textError: '',
    validator: firstNameValidator,
  },
  {
    id: 'second_name',
    name: INPUT_NAMES.second_name,
    label: 'Фамилия',
    type: 'text',
    textError: '',
    validator: lastNameValidator,
  },
  {
    id: 'phone',
    name: INPUT_NAMES.phone,
    label: 'Телефон',
    type: 'text',
    textError: '',
    validator: phoneValidator,
  },
  {
    id: 'password',
    name: INPUT_NAMES.password,
    label: 'Пароль',
    type: 'password',
    textError: '',
    autocomplete: false,
    validator: passwordValidator,
  },
  {
    id: 'password_repeat',
    name: INPUT_NAMES.password_repeat,
    label: 'Пароль (ещё раз)',
    type: 'password',
    autocomplete: false,
    textError: '',
    validator: (value: string) => {
      const newPasswordInput: HTMLInputElement | null = document.querySelector('[name=password]');
      const submitButton: HTMLButtonElement | null = document.querySelector('[type=submit]');

      if (!value) {
        return 'Поле обязательно';
      }

      if (value !== newPasswordInput?.value) {
        if (submitButton) {
          submitButton.disabled = true;
        }

        return 'Пароли не совпадают';
      }

      if (submitButton) {
        submitButton.disabled = false;
      }

      return '';
    },
  },
];
