import { Injectable } from "@angular/core";
import { ReplaySubject, Observable } from "rxjs";
import { List } from "immutable";

import { SocketService } from "./socket.service";
import { MessagesStateService } from "../state-services/message-state.service";

import { IMessage, ISocketItem, IAction, MessagesState } from "./../../models";
import { MESSAGE_ACTIONS } from "./../../constants";

@Injectable()
export class MessageService {
    messages: ReplaySubject<any> = new ReplaySubject(1);
    messages_: Observable<Array<IMessage>>;

    private list: any[] = [];
    private socketService: SocketService;
    private messageStateService: MessagesStateService = new MessagesStateService();

    constructor(private room: string) {
        this.loadMessages();
    }

    loadMessages() {
        this.socketService = new SocketService();
        this.socketService
            .get("messages/" + encodeURIComponent(this.room))
            .subscribe(
                (socketItem: ISocketItem) => {
                    let message: IMessage = socketItem.item;
                    this.list.push(message);
                    this.messages.next(this.list);
                    this.messageStateService.refreshMessages({messages: this.list});
                },
                error => console.log(error)
            );
    }

    // Emit message using socket service
    create(from: string, message: string): void {
        this.socketService.emitAction(MESSAGE_ACTIONS.CREATE_MESSAGE, {
            room: this.room,
            created: new Date(),
            from: from,
            to: "",
            message: message
        });
    }
}