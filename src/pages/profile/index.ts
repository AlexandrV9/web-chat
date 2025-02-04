import { Navbar } from '@/blocks/navbar';
import { Block } from '../../services/Block';
import tmpl from './tmpl';
import { FieldInput } from '@/components';
import { INPUT_FIELDS } from './constants';

import cls from "./styles.module.scss";

interface ProfilePageProps {}

export class ProfilePage extends Block {
  constructor() {
    super('div', {
      Inputs: INPUT_FIELDS.map(item => new FieldInput({ ...item, className: cls.itemList })),
      navbar: new Navbar(),
    });
  }

  render() {
    return tmpl;
  }
}
