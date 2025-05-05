import { Block } from '@/shared/services/Block';
import { Button, Icon, Image } from '@/shared/ui';
import { LeftPanel, ModalUpdateAvatar, ModalUpdatePassword, ModalUpdateProfile } from '@/widgets';
import { tmpl } from './ProfilePage.tmpl';
import { ITEMS } from './constants';
import { store, STORE_EVENTS } from '@/shared/services';

import { PlainObject, User } from '@/types';
import { ProfileListItem } from './ProfileListItem';
import { AuthController } from '@/shared/controllers';

import { getImageSrc, getUserName } from '@/shared/utils';

import styles from './ProfilePage.module.scss';

import iconUser from '@/shared/assets/icons/user-circle.svg';

export class ProfilePage extends Block {
  constructor() {
    super({
      profileName: '',
      LeftPanel: new LeftPanel({
        title: 'Профиль',
      }),
      Avatar: new Icon({ src: iconUser, size: 40 }),
      Items: [],
      UpdateAvatarButton: new Button({
        variant: 'clean',
        className: styles.updateAvatarButton,
        onClick: event => {
          event.preventDefault();
          this.getPropValue('ModalUpdateAvatar').setProps({ isOpen: true });
        },
        children: `
          <p class=${styles.textHint}>
            <span>Поменять</span>
            <span>аватар</span>                
          </p>
        `,
      }),
      UpdateProfileButton: new Button({
        children: 'Обновить профиль',
        onClick: e => {
          e.preventDefault();
          this.getPropValue('ModalUpdateProfile').setProps({ isOpen: true });
        },
      }),
      UpdatePasswordButton: new Button({
        children: 'Обновить пароль',
        onClick: e => {
          e.preventDefault();
          this.getPropValue('ModalUpdatePassword').setProps({ isOpen: true });
        },
      }),
      SignOutButton: new Button({
        children: 'Выйти',
        variant: 'alert',
        onClick: e => {
          e.preventDefault();

          AuthController.signOut();
        },
      }),
      ModalUpdateAvatar: new ModalUpdateAvatar(),
      ModalUpdateProfile: new ModalUpdateProfile(),
      ModalUpdatePassword: new ModalUpdatePassword(),
    });
  }

  componentDidMount() {
    store.on(STORE_EVENTS.updated, () => {
      const state = store.getState() as { user: PlainObject };

      if (!state.user) return;

      this.setProps({
        Avatar: state.user.avatar
          ? new Image({ src: getImageSrc(state.user.avatar), className: styles.avatar })
          : new Icon({ src: iconUser, size: 40 }),
        profileName: getUserName(state.user as User),
        Items: ITEMS.map(item => {
          const value = state.user[item.name];
          return new ProfileListItem({ title: item.label, value: item.format(value) });
        }),
      });
    });
  }

  render() {
    const classNameForm = this.getPropValue('classNameForm');

    return tmpl(classNameForm);
  }
}
