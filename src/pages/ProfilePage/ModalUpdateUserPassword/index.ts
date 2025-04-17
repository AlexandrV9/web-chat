import { Modal } from '@/shared/ui';
import { FormUpdatePassword } from './FormUpdatePassword';
import { Store, STORE_EVENTS } from '@/shared/services';

export const modalStore = new Store({
  isOpen: false,
});

export class ModalUpdateUserPassword extends Modal {
  constructor() {
    super({
      isOpen: false,
      onClose: () => {
        modalStore.setState({ isOpen: false });
      },
      children: new FormUpdatePassword({
        onCloseModal: () => {
          this.setProps({
            isOpen: false,
          });
        },
      }),
    });

    modalStore.on(STORE_EVENTS.updated, () => {
      const state = modalStore.getState();

      this.setProps({ isOpen: state.isOpen });
    });
  }
}
