import { Block } from '@/shared/services/Block';
import { FieldInput } from '@/shared/ui';
import { LeftPanel } from '@/widgets';
import { tmpl } from './tmpl';
import { INPUT_FIELDS } from './constants';
import { SignOutButton } from '@/feauters/auth/signOut';
import { UserController } from '@/shared/controllers';
import { store, STORE_EVENTS } from '@/shared/services';

import cls from './styles.module.scss';
import { getUserName } from '@/shared/utils';
import { User } from '@/types';

export class ProfilePage extends Block {
  constructor() {
    super({
      LeftPanel: new LeftPanel({
        title: 'Профиль',
      }),
      Inputs: INPUT_FIELDS.map(item => {
        return new FieldInput({ ...item, className: cls.itemList, value: 'd' });
      }),
      SignOutButton,
    });

    UserController.getAuthUser();

    store.on(STORE_EVENTS.updated, () => {
      const { user } = store.getState() as { user: User };

      if(!user) return;

      this._lists.Inputs.children.forEach(item => {
        const inputName = item._children.input.props.name;

        item._children.input.setProps({ value: user[inputName] ?? '' })
      });

      this.setProps({ profileName: getUserName(user) });
    });
  }

  render() {
    return tmpl;
  }
}
