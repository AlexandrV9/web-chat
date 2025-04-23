import { Modal } from '@/shared/ui';
import { FormCreateChat } from './FormCreateChat';

interface ModalCreateChatProps {
  isOpen?: boolean;
}

export class ModalCreateChat extends Modal {
  constructor({ isOpen = false }: ModalCreateChatProps) {
    super({
      isOpen,
      onClose: () => {
        this.setProps({ isOpen: false });
      },
      children: new FormCreateChat({
        onCloseModal: () => {
          this.setProps({
            isOpen: false,
          });
        },
      }),
    });
  }
}
