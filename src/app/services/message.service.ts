import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { List } from "immutable";

import { SocketService } from "./socket.service";

import { IMessage, ISocketItem } from "./../../models";
import { MESSAGE_ACTIONS } from "./../../constants";

@Injectable()
export class MessageService {
    messages: ReplaySubject<any> = new ReplaySubject(1);
    private list: List<any> = List();
    private socketService: SocketService;

    constructor(private room: string) {
        this.socketService = new SocketService();
        this.socketService
            .get("messages/" + encodeURIComponent(this.room))
            .subscribe(
                (socketItem: ISocketItem) => {
                    let message: IMessage = socketItem.item;
                    this.list = this.list.push(message);
                    this.messages.next(this.list);
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