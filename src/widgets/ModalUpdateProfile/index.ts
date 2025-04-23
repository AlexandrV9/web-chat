import { store, Store, STORE_EVENTS } from '@/shared/services';
import { Modal } from '@/shared/ui';
import { FormUpdateProfile } from './FormUpdateProfile';

export const modalUpdateProfileStore = new Store({
  isOpen: false,
});

export class ModalUpdateProfile extends Modal {
  constructor() {
    super({
      isOpen: false,
      onClose: () => {
        modalUpdateProfileStore.setState({ isOpen: false });
      },
      children: new FormUpdateProfile({
        onCloseModal: () => {
          this.setProps({
            isOpen: false,
          });
        },
      }),
    });

    store.on(STORE_EVENTS.updated, () => {});

    modalUpdateProfileStore.on(STORE_EVENTS.updated, () => {
      const state = modalUpdateProfileStore.getState();

      this.setProps({ isOpen: state.isOpen });
    });
  }
}
