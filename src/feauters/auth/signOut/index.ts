import { Button } from '@/shared/ui';

import styles from './SignOutButton.module.scss';

import { navigate } from '@/shared/utils';
import { APP_ROUTES } from '@/shared/constants';
import { AuthAPI } from '@/shared/api';

export const SignOutButton = new Button({
  children: 'Выйти',
  className: styles.button,
  onClick: async e => {
    e.preventDefault();

    const res = await AuthAPI.signOut();

    if (res.ok) {
      navigate(APP_ROUTES.SIGN_IN);
    }
  },
});
