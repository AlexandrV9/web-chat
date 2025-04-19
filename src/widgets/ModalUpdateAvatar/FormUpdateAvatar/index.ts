import { Store, store, STORE_EVENTS } from '@/shared/services';
import { Block } from '@/shared/services/Block';
import { Button, Typography } from '@/shared/ui';
import { tmpl } from './FormUpdateAvatar.tmpl';

import { ReqUpdateProfile } from '@/shared/api';
import { UserController } from '@/shared/controllers/UserController';
import { DropArea } from './DropArea';
import { HOST_API } from '@/shared/constants';

const initialState = {
  file: '',
};

const formStore = new Store(initialState);

interface FormUpdateProfileProps {
  onCloseModal?: () => void;
}

export class FormUpdateAvatar extends Block {
  constructor({ onCloseModal }: FormUpdateProfileProps) {
    super({
      errorForm: '',
      Title: new Typography({ text: 'Обновление аватара', variant: 'text2', align: 'center' }),
      DropArea: new DropArea({
        onLoadFile: file => {
          formStore.setState({ file });
        },
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

          const state = formStore.getState();
          const file = state.file;

          this.setProps({
            errorForm: !file ? 'Файл не загружен' : '',
          });

          if (!file) {
            return;
          }

          const formData = new FormData();
          formData.append('avatar', file);
          const res = await UserController.updateAvatar(formData);

          if (res.ok) {
            alert('Аватар успешно обновлен');
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
      submitButton.setProps({ disabled: !state.file });
    });
  }

  componentDidMount() {
    store.on(STORE_EVENTS.updated, () => {
      const state = store.getState();
    });
  }

  onCancel() {
    const dropArea = this.getPropValue('DropArea') as Block;

    dropArea.getPropValue('PreloadContent').show();
    dropArea.setProps({ PreviewImage: '' });
  }

  render() {
    const errorForm = this.getPropValue('errorForm');

    return tmpl(errorForm);
  }
}
