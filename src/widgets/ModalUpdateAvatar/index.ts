import { store, Store, STORE_EVENTS } from '@/shared/services';
import { Modal } from '@/shared/ui';
import { FormUpdateAvatar } from './FormUpdateAvatar';

export const modalUpdateAvatarStore = new Store({
  isOpen: false,
});

export class ModalUpdateAvatar extends Modal {
  constructor() {
    super({
      isOpen: false,
      onClose: () => {
        modalUpdateAvatarStore.setState({ isOpen: false });
      },
      children: new FormUpdateAvatar({
        onCloseModal: () => {
          this.setProps({
            isOpen: false,
          });
        },
      }),
    });

    store.on(STORE_EVENTS.updated, () => {});

    modalUpdateAvatarStore.on(STORE_EVENTS.updated, () => {
      const state = modalUpdateAvatarStore.getState();

      this.setProps({ isOpen: state.isOpen });
    });
  }
}
