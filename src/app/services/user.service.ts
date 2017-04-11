import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

import { IRoom, IUser, ISocketItem, User } from "../../models";
import { SocketService } from './socket.service';
import { List } from "immutable";

import { USER_ACTIONS } from "../../constants";

@Injectable()
export class UserService {
    user: IUser = {nickname: ""};
    users: ReplaySubject<any> = new ReplaySubject(1);
    rooms: IRoom[] = [];
    currentRoom: IRoom;
    private list: List<any> = List();

    constructor(
        private socketService: SocketService
    ) {
        this.socketService
            .get("user")
            .subscribe(
            (socketItem: ISocketItem) => {
                let user: IUser = socketItem.item;
                let index: number = this.findIndex(user.nickname);
                if (socketItem.action === USER_ACTIONS.REMOVE_USER) {
                    // Remove
                    this.list = this.list.delete(index);
                } else {
                    if (index === -1) {
                        // Create
                        this.list = this.list.push(user);
                    } else {
                        // Update
                        this.list = this.list.set(index, user)
                    }
                }
                this.users.next(this.list);
            },
            error => console.log(error)
            );
    }

    // Emit message using socket service
    create(nickname: string): void {
        this.socketService.socket.emit(USER_ACTIONS.CREATE_USER, {
            nickname: nickname
        });
        this.setUser(nickname);
    }

    setUser(nickname: string) {
        this.user = <IUser>{nickname: nickname};
    }

    // Find matching user
    public findIndex(nickname: string): number {
        return this.list.findIndex((user: IUser) => {
            return user.nickname === nickname;
        });
    }
}