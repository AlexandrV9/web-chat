import { clsx } from '@/shared/utils';
import cls from './ProfilePage.module.scss';

export const tmpl = (classNameForm: string) => `
<div class="page-content">

  {{{ LeftPanel }}}

  <div class=${cls.mainContainer}>

    <div class=${cls.profileAvatar}>
      <div class=${cls.avatarWrapper}>
        {{{ Avatar }}}
      </div>
      <div class=${cls.cover}>
        {{{ UpdateAvatarButton }}}
      </div>
    </div>

    <h3 class=${cls.profileName}>{{ profileName }}</h3>

    <div class='${clsx(cls.content, classNameForm)}'>

      <ul class=${cls.profileInfoList}>
        {{{ Items }}}
      </ul>

      <div class=${cls.actionSlot}>
        {{{ UpdateProfileButton }}}
        {{{ UpdatePasswordButton }}}
        {{{ SignOutButton }}}
      </div>

    </div>
  </div>

  {{{ ModalUpdateAvatar }}}
  {{{ ModalUpdateProfile }}}
  {{{ ModalUpdatePassword }}}
</div>
`;
