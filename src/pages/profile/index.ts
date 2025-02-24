import tmpl from './tmpl';
import { INPUT_FIELDS } from './constants';

import cls from './styles.module.scss';
import { Block } from '@/services/Block';
import { FieldInput } from '@/components';
import { LeftPanel } from '@/widgets';

export class ProfilePage extends Block {
  constructor() {
    super({
      LeftPanel: new LeftPanel({
        title: 'Профиль',
      }),
      Inputs: INPUT_FIELDS.map(item => new FieldInput({ ...item, className: cls.itemList })),
    });
  }

  render() {
    return tmpl;
  }
}
