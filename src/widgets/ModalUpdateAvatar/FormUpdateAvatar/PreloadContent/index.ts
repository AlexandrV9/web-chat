import { Block } from '@/shared/services';
import { Icon, Typography } from '@/shared/ui';

import iconUpload from '@/shared/assets/icons/upload.svg';

import styles from './PreloadContent.module.scss';

export class PreloadContent extends Block {
  constructor() {
    super({
      IconUpload: new Icon({ src: iconUpload, size: 40 }),
      LabelText: new Typography({ text: 'Нажмите здесь для загрузки фото', variant: 'text2', align: 'center' }),
    });
  }

  render() {
    return `
      <div class=${styles.preloadContent}>
        {{{ IconUpload }}}
        {{{ LabelText }}}
      </div>
    `;
  }
}
