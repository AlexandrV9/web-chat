import { Block } from '@/shared/services/Block';
import { Button, FieldInput } from '@/shared/ui';
import { LeftPanel } from '@/widgets';
import { tmpl } from './tmpl';
import { INPUT_FIELDS } from './constants';
import { SignOutButton } from '@/feauters/auth/signOut';
import { BlockProps, store, STORE_EVENTS } from '@/shared/services';

import cls from './ProfilePage.module.scss';
import { getUserName } from '@/shared/utils';
import { PlainObject, User } from '@/types';
import { modalStore, ModalUpdateUserPassword } from './ModalUpdateUserPassword';

export class ProfilePage extends Block {
  constructor() {
    super({
      classNameForm: 'form-profile',
      LeftPanel: new LeftPanel({
        title: 'Профиль',
      }),
      Inputs: INPUT_FIELDS.map(item => {
        return new FieldInput({ ...item, className: cls.itemList, value: 'd' });
      }),
      UpdatePasswordButton: new Button({
        children: 'Обновить пароль',
        onClick: e => {
          e.preventDefault();

          modalStore.setState({ isOpen: true });
        },
      }),
      SignOutButton,
      ModalUpdatePassword: new ModalUpdateUserPassword(),
    });
  }

  componentDidMount() {
    store.on(STORE_EVENTS.updated, () => {
      const state = store.getState() as { user: User };

      if (!state.user) return;

      this.setFormInputes(state.user);
      this.setProps({ profileName: getUserName(state.user) });
    });
  }

  setFormInputes(formData: PlainObject) {
    const formElement = this.getContent()?.querySelector(`.${this.props.classNameForm}`);

    if (!formElement) {
      return;
    }

    const { elements } = formElement as HTMLFormElement;

    const inputs = Array.from(elements).filter(item => {
      return item.nodeName === 'INPUT';
    }) as HTMLInputElement[];

    inputs.forEach(input => {
      input.value = formData[input.name];
    });
  }

  render() {
    return tmpl(this.props as any);
  }
}
