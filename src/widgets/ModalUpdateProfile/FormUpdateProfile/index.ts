import { Block } from '@/shared/services/Block';
import { Button, FieldInput, Typography } from '@/shared/ui';
import { tmpl } from './FormUpdateProfile.tmpl';
import { Store, store, STORE_EVENTS } from '@/shared/services';

import { PlainObject } from '@/types';
import { INPUT_FIELDS } from './constants';
import { UserController } from '@/shared/controllers/UserController';
import { ReqUpdateProfile } from '@/shared/api';

interface FormUpdateProfileProps {
  onCloseModal?: () => void;
}

const initialState = INPUT_FIELDS.map(item => item.name).reduce((acc: PlainObject, key) => {
  acc[key] = false;
  return acc;
}, {});

const formStore = new Store(initialState);

export class FormUpdateProfile extends Block {
  constructor({ onCloseModal }: FormUpdateProfileProps) {
    super({
      errorForm: '',
      Title: new Typography({ text: 'Обновление профиля', variant: 'text2', align: 'center' }),
      Inputs: INPUT_FIELDS.map(item => {
        return new FieldInput({
          ...item,
          onValid: isValid => {
            formStore.setState({ [item.name]: isValid });
          },
        });
      }),
      ButtonSubmit: new Button({
        type: 'submit',
        disabled: false,
        variant: 'success',
        children: 'Сохранить',
      }),
      ButtonCancel: new Button({
        children: 'Отмена',
        onClick: event => {
          event.preventDefault();
          onCloseModal?.();
          this.onCancel();
        },
      }),
      events: {
        submit: async (event: Event) => {
          event.preventDefault();

          const { elements } = event.target as HTMLFormElement;

          const inputs = Array.from(elements).filter(el => {
            return el.nodeName === 'INPUT';
          }) as HTMLInputElement[];

          const formData = inputs.reduce((acc: Record<string, string>, input) => {
            acc[input.name] = input.value;
            return acc;
          }, {}) as unknown as ReqUpdateProfile;

          const state = formStore.getState();
          const isNotValid = Object.values(state).includes(false);

          this.setProps({
            errorForm: isNotValid ? 'Некоторые поля формы заполнены не верно' : '',
          });

          if (isNotValid) {
            return;
          }

          const res = await UserController.updateProfile(formData);

          if (res.ok) {
            alert('Профиль успешно обновлен');
            onCloseModal?.();
          } else {
            this.setProps({
              errorForm: 'Запрос не прошел, попробуйте еще раз',
            });
          }
        },
      },
    });

    formStore.on(STORE_EVENTS.updated, () => {
      const state = formStore.getState();
      const submitButton = this.getPropValue('ButtonSubmit') as Block;
      submitButton.setProps({ disabled: Object.values(state).includes(false) });
    });
  }

  componentDidMount() {
    store.on(STORE_EVENTS.updated, () => {
      this.setInputs();
    });
  }

  onCancel() {
    this.setInputs();
  }

  setInputs() {
    const state = store.getState() as { user: PlainObject };

    if (!state.user) return;

    this.getPropValue('Inputs').forEach((InputField: Block) => {
      const Input = InputField.getPropValue('input') as Block;
      const validator = InputField.getPropValue('validator');
      const inputName = Input.getPropValue('name');
      const inputElement = Input.getContent() as HTMLInputElement;
      const value = state.user[inputName];

      formStore.setState({ [inputName]: !validator(value) });
      inputElement.value = state.user[inputName];
    });
  }

  render() {
    const errorForm = this.getPropValue('errorForm');

    return tmpl(errorForm);
  }
}
