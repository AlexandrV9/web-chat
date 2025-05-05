import { passwordValidator } from '@/shared/services/Validator';

export const INPUT_NAMES = {
  oldPassword: 'oldPassword',
  newPassword: 'newPassword',
  newPasswordRepeat: 'newPasswordRepeat',
} as const;

export const INPUT_FIELDS = [
  {
    id: INPUT_NAMES.oldPassword,
    name: INPUT_NAMES.oldPassword,
    label: 'Текущий пароль',
    type: 'password',
    validator: passwordValidator,
  },
  {
    id: INPUT_NAMES.newPassword,
    name: INPUT_NAMES.newPassword,
    label: 'Новый пароль',
    type: 'password',
    autocomplete: false,
    validator: passwordValidator,
  },
  {
    id: INPUT_NAMES.newPasswordRepeat,
    name: INPUT_NAMES.newPasswordRepeat,
    label: 'Новый пароль ещё раз',
    type: 'password',
    autocomplete: false,
    textError: '',
    validator: (value: string) => {
      const newPasswordInput: HTMLInputElement | null = document.querySelector(`[name=${INPUT_NAMES.newPassword}]`);
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
