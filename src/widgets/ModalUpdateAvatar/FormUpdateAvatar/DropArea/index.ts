import { Block } from '@/shared/services';
import { Image, Input } from '@/shared/ui';

import styles from './DropArea.module.scss';
import { PreloadContent } from '../PreloadContent';

interface DropAreaProps {
  onLoadFile?: (file: File) => void;
}

export class DropArea extends Block {
  constructor({ onLoadFile }: DropAreaProps) {
    super({
      PreloadContent: new PreloadContent(),
      PreviewImage: '',
      InputAvatar: new Input({
        type: 'file',
        name: 'avatar',
        className: styles.inputAvatar,
        accept: 'image/*',
        id: 'input-file',
        onChange: event => {
          const input = event.target as HTMLInputElement;
          const file = input.files?.[0];

          if (!file) return;

          this.getPropValue('PreloadContent')?.hide();
          this.setProps({ PreviewImage: new Image({ src: URL.createObjectURL(file), className: styles.previewImage }) });

          onLoadFile?.(file);
        },
      }),
    });
  }

  render() {
    return `
      <div class=${styles.dropArea}>
        <label for="input-file" class=${styles.label}>
          {{{ InputAvatar }}}
          <div class=${styles.content}>
            {{{ PreloadContent }}}
            {{{ PreviewImage }}}
          </div>
        </label>
      </div>
    `;
  }
}
