import { Injectable } from "@angular/core";
import { StateService } from "./abstract.state.service";
import { MessagesState, IMessage, ISocketItem } from "../../models";

import { SocketService } from "./../services/socket.service";
import { MESSAGE_ACTIONS } from "../../constants";

@Injectable()
export class MessagesStateService extends StateService<MessagesState> {
  private socketService: SocketService;
  constructor() {
    super();
    this.initializeMessagesSocket();
  }

  initialState(): MessagesState {
    return { messages: [], room: "" };
  }

  initializeMessagesSocket(): void {
    this.socketService = new SocketService();
  }

  updateStateMessages(roomName: string, messagesList: IMessage[]): void {
    let state = this.getValue();
    this.update(Object.assign({}, state, {
      room: roomName,
      messages: messagesList
    }));
  }

  loadMessagesForRoom(roomName: string) {
    let messages = [];
    this.socketService
        .get("messages/" + encodeURIComponent(roomName))
        .subscribe(
          (socketItem: ISocketItem) => {
            let message: IMessage = socketItem.item;
            messages.push(message);
            this.updateStateMessages(roomName, messages);
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
