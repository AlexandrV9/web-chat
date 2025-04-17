import { store } from '@/shared/services';
import { ReqWebSocketConnect } from './types';
import { convertObjKeysToCamelCase } from '@/shared/utils';

class MessageController {
  private _ws!: WebSocket;
  private _userId!: number;
  private _chatId!: number;
  private _token!: string;
  private _ping!: NodeJS.Timeout;

  constructor() {
    this._handleOpen = this._handleOpen.bind(this);
    this._handleMassage = this._handleMassage.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleError = this._handleError.bind(this);
  }

  private _addEvents() {
    this._ws.addEventListener('open', this._handleOpen);
    this._ws.addEventListener('close', this._handleClose);
    this._ws.addEventListener('error', this._handleError);
    this._ws.addEventListener('message', this._handleMassage);
  }

  private _removeEvents() {
    this._ws.removeEventListener('open', this._handleOpen);
    this._ws.removeEventListener('close', this._handleClose);
    this._ws.removeEventListener('message', this._handleMassage);
  }

  private _handleOpen() {
    this.getMessages({ offset: 0 });
    this._ping = setInterval(() => {
      this._ws.send('');
    }, 10000);
  }

  private _handleError(evt: ErrorEvent) {
    console.log('handleError', evt.message);
  }

  private _handleMassage(evt: MessageEvent) {
    const data = JSON.parse(evt.data);

    console.log('data', data);

    if (Array.isArray(data)) {
      if (!data.length) {
        store.setState({ messages: [] });
      } else if (data[0].id === 0) {
        store.setState({ messages: data.map(item => convertObjKeysToCamelCase(item)) });
      } else {
        const messages = [...store.state.messages, ...data.map(item => convertObjKeysToCamelCase(item))];
        store.setState({ messages });
      }
    } else if (typeof data === 'object' && data.type === 'message') {
      const messages = [data, ...store.state.messages];
      store.setState({ messages });
    }
  }
  private _handleClose(evt: CloseEventInit) {
    this._removeEvents();

    if (evt.code === 1006) {
      this._reconnect();
    }
  }

  private _reconnect() {
    this.connect({
      userId: this._userId,
      chatId: this._chatId,
      token: this._token,
    });
  }

  public connect({ userId, chatId, token }: ReqWebSocketConnect) {
    this._userId = userId;
    this._chatId = chatId;
    this._token = token;
    this._ws = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    this._addEvents();
  }

  public getMessages(options: { offset: number }) {
    this._ws.send(
      JSON.stringify({
        content: options.offset.toString(),
        type: 'get old',
      }),
    );
  }

  public leave() {
    if (!this._ws) return;

    clearInterval(this._ping);
    this._ws.close();
    this._removeEvents();
  }

  public sendMessage(message: string) {
    this._ws.send(
      JSON.stringify({
        content: message,
        type: 'message',
      }),
    );
  }
}

export const messageController = new MessageController();
