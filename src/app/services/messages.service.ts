import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { IMessage, ISocketItem } from "../../models";
import { AppStore } from '../../models/appstore.model';
import { SocketService } from "./socket.service";

import { MESSAGE_ACTIONS } from "../../constants";

@Injectable()
export class MessagesService {
  messages: Observable<Array<IMessage>>;
  private socketService: SocketService;

  constructor(private store: Store<AppStore>) {
    this.messages = store.select('messages');
    this.initializeMessagesSocket();
  }

  initializeMessagesSocket(): void {
    this.socketService = new SocketService();
  }

  loadMessagesForRoom(roomName: string) {
    this.socketService
        .get("messages/" + encodeURIComponent(roomName))
        .subscribe(
          (socketItem: ISocketItem) => {
            this.store.dispatch({type: MESSAGE_ACTIONS.ADD_MESSAGES, payload: socketItem.item});
          },
          error => console.log(error)
        );
    }

    sendMessageToRoom(from: string, message: string, room: string): void {
      this.socketService.emitAction(MESSAGE_ACTIONS.CREATE_MESSAGE, {
        room: room,
        created: new Date(),
        from: from,
        to: "",
        message: message
      });
    }
}