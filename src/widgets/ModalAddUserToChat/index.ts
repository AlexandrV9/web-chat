import { Button, Icon, Input, Modal, Typography } from '@/shared/ui';
import { Block, store, Store, STORE_EVENTS } from '@/shared/services';

import { tmpl } from './ModalAddUserToChat.tmpl';

import searchIcon from '@/shared/assets/icons/search.svg';
import deleteIcon from '@/shared/assets/icons/delete.svg';
import plusCircleIcon from '@/shared/assets/icons/plus-circle.svg';

import styles from './ModalAddUserToChat.module.scss';

import { UserItem } from './UserItem';
import { UserController } from '@/shared/controllers/UserController';
import { Chat, User } from '@/types';
import { ChatController } from '@/shared/controllers';

const modalAddUserToChat = new Store({
  searchedUsers: [],
  addedUsers: [],
});

class ModalContent extends Block {
  constructor() {
    super({
      Title: new Typography({
        variant: 'text2',
        text: 'Редактирование списка участников чата',
        align: 'center',
      }),
      SearchedUsers: [],
      AddedUsers: [],
      SearchInput: new Input({
        id: 'userlogin',
        name: 'userlogin',
        placeholder: 'Логин пользователя',
        className: styles.searchInput,
      }),
      SearchButton: new Button({
        type: 'submit',
        variant: 'clean',
        children: new Icon({ src: searchIcon }),
        onClick: async (event: Event) => {
          event.preventDefault();

          const searchInput = this.getPropValue('SearchInput').getContent();
          const search = searchInput.value;

          const res = await UserController.searchUserByLogin({ login: search });
          modalAddUserToChat.setState({ searchedUsers: res.data ?? [] });
        },
      }),
    });

    this.getAddedUsers();

    modalAddUserToChat.on(STORE_EVENTS.updated, () => {
      const state = modalAddUserToChat.getState();

      const addedUsers = state.addedUsers ?? [];
      const addedUsersIds = addedUsers.map((item: User) => item.id);

      const searchedUsers = state?.searchedUsers?.filter((item: User) => !addedUsersIds.includes(item.id)) ?? [];

      const SearchedUsers = this.generateUserItems(searchedUsers as User[], (chatId, user) => {
        return new Button({
          variant: 'clean',
          children: new Icon({ src: plusCircleIcon }),
          onClick: async () => {
            await ChatController.addUsersToChat({
              chatId,
              users: [user.id],
            });

            this.getAddedUsers();
          },
        });
      });

      const AddedUsers = this.generateUserItems(addedUsers as User[], (chatId, user) => {
        return new Button({
          variant: 'clean',
          children: new Icon({ src: deleteIcon }),
          onClick: async () => {
            await ChatController.deleteUsersFromChat({
              chatId,
              users: [user.id],
            });

            this.getAddedUsers();
          },
        });
      });

      this.setProps({
        SearchedUsers,
        AddedUsers,
      });
    });
  }

  private async getAddedUsers() {
    const state = store.getState();
    const selectedChatId = state.chatId;

    if (!selectedChatId) return;

    const res = await ChatController.getChatUsers({ chatId: selectedChatId });
    modalAddUserToChat.setState({ addedUsers: res.data ?? [] });
  }

  private generateUserItems(users?: User[], renderActionButton?: (chatId: Chat['id'], user: User) => Block) {
    if (!users) {
      return [];
    }

    const state = store.getState();
    const chatId = state?.chatId;
    const currentUser = state.user as User;

    return users.map(item => {
      const user = item as User;
      return new UserItem({
        title: user.login,
        ActionButton: currentUser.id !== user.id ? renderActionButton?.(chatId, user) : null,
      });
    });
  }

  render() {
    return tmpl;
  }
}

export const modalUpdatePasswordStore = new Store({
  isOpen: false,
});

interface ModalAddUserToChatProps {
  isOpen?: boolean;
}

export class ModalAddUserToChat extends Modal {
  constructor({ isOpen = false }: ModalAddUserToChatProps) {
    super({
      isOpen,
      onClose: () => this.setProps({ isOpen: false }),
      children: new ModalContent(),
    });

    modalUpdatePasswordStore.on(STORE_EVENTS.updated, () => {
      const state = modalUpdatePasswordStore.getState();
      this.setProps({ isOpen: state.isOpen });
    });
  }
}
