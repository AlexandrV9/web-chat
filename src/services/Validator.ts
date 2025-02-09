export class Validator {
  private value: string;
  private error: string | null = null;

  constructor(value: string) {
    this.value = value;
  }

  min(length: number, message: string) {
    if (!this.error && this.value.length < length) {
      this.error = message;
    }
    return this;
  }

  max(length: number, message: string) {
    if (!this.error && this.value.length > length) {
      this.error = message;
    }
    return this;
  }

  required(message: string) {
    if (!this.error && !this.value.trim()) {
      this.error = message;
    }
    return this;
  }

  hasUpperCase(message: string) {
    if (!this.error && !/[A-Z]/.test(this.value)) {
      this.error = message;
    }
    return this;
  }

  hasNumber(message: string) {
    if (!this.error && !/\d/.test(this.value)) {
      this.error = message;
    }
    return this;
  }

  isNumeric(message: string) {
    if (!this.error && !/^\d+$/.test(this.value.replace('+', ''))) {
      this.error = message;
    }
    return this;
  }

  notOnlyNumbers(message: string) {
    if (!this.error && /^\d+$/.test(this.value)) {
      this.error = message;
    }
    return this;
  }

  noSpaces(message: string) {
    if (!this.error && /\s/.test(this.value)) {
      this.error = message;
    }
    return this;
  }

  isLatin(message: string) {
    if (!this.error && /[^a-zA-Z0-9\-_]/.test(this.value)) {
      this.error = message;
    }
    return this;
  }

  isLatinOrCyrillic(message: string) {
    if (!this.error && !/^[a-zA-Zа-яА-Я-]+$/.test(this.value)) {
      this.error = message;
    }
    return this;
  }

  hasNoDigits(message: string) {
    if (!this.error && /\d/.test(this.value)) {
      this.error = message;
    }
    return this;
  }

  startsWithUpperCase(message: string) {
    if (!this.error && !/^[A-ZА-Я]/.test(this.value)) {
      this.error = message;
    }
    return this;
  }

  startsWithPlus(message: string) {
    if (!this.error && !this.value.startsWith('+')) {
      this.error = message;
    }
    return this;
  }

  custom(message: string, regExp: RegExp) {
    if (!this.error && !regExp.test(this.value)) {
      this.error = message;
    }
    return this;
  }

  validate() {
    return this.error ?? '';
  }
}

export const loginValidator = (value: string) => {
  return new Validator(value)
    .required('Поле обязательно')
    .min(3, 'Логин слишком короткий')
    .max(20, 'Логин слишком длинный')
    .isLatin('Логин должен содержать только латиницу, цифры, дефис или нижнее подчёркивание')
    .notOnlyNumbers('Логин не может состоять только из цифр')
    .noSpaces('Логин не должен содержать пробелы')
    .validate();
};

export const passwordValidator = (value: string) => {
  return new Validator(value)
    .required('Поле обязательно')
    .min(8, 'Пароль слишком короткий')
    .max(40, 'Пароль слишком длинный')
    .hasUpperCase('Пароль должен содержать хотя бы одну заглавную букву')
    .hasNumber('Пароль должен содержать хотя бы одну цифру')
    .validate();
};

export const emailValidator = (value: string) => {
  return new Validator(value)
    .required('Поле обязательно')
    .custom('Некорректный формат email', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .validate();
};

export const phoneValidator = (value: string) => {
  return new Validator(value)
    .required('Телефон обязателен')
    .min(10, 'Номер телефона должен содержать минимум 10 символов')
    .max(15, 'Номер телефона не может быть длиннее 15 символов')
    .isNumeric('Телефон должен содержать только цифры')
    .startsWithPlus('Номер телефона может начинаться с плюса')
    .validate();
};

export const firstNameValidator = (value: string) => {
  return new Validator(value)
    .required('Имя обязательно')
    .isLatinOrCyrillic('Имя должно содержать только латиницу, кириллицу и дефис')
    .startsWithUpperCase('Первая буква имени должна быть заглавной')
    .hasNoDigits('Имя не должно содержать цифры')
    .noSpaces('Имя не должно содержать пробелы')
    .validate();
};

export const lastNameValidator = (value: string) => {
  return new Validator(value)
    .required('Фамилия обязательна')
    .isLatinOrCyrillic('Фамилия должна содержать только латиницу, кириллицу и дефис')
    .startsWithUpperCase('Первая буква фамилии должна быть заглавной')
    .hasNoDigits('Фамилия не должна содержать цифры')
    .noSpaces('Фамилия не должна содержать пробелы')
    .validate();
};
