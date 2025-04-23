import { Modal } from '@/shared/ui';
import { Store, STORE_EVENTS } from '@/shared/services';
import { FormUpdatePassword } from './FormUpdatePassword';

export const modalUpdatePasswordStore = new Store({
  isOpen: false,
});

export class ModalUpdatePassword extends Modal {
  constructor() {
    super({
      isOpen: false,
      onClose: () => {
        modalUpdatePasswordStore.setState({ isOpen: false });
      },
      children: new FormUpdatePassword({
        onCloseModal: () => {
          this.setProps({
            isOpen: false,
          });
        },
      }),
    });

    modalUpdatePasswordStore.on(STORE_EVENTS.updated, () => {
      const state = modalUpdatePasswordStore.getState();

      this.setProps({ isOpen: state.isOpen });
    });
  }
}
