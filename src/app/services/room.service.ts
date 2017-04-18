import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { List } from "immutable";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { SocketService } from "./socket.service";
import { UserService } from "./user.service";

import { AppStore } from '../../models/appstore.model';

import { IRoom, ISocketItem } from "../../models";

import { ROOM_ACTIONS } from "../../constants";

@Injectable()
export class RoomService {
    rooms: Observable<Array<IRoom>>;
    currentRoom: Observable<IRoom>;
    private list: List<any> = List();

    constructor(
        private socketService: SocketService,
        private userService: UserService,
        private store: Store<AppStore>
    ) {
        this.rooms = store.select('rooms');
        this.currentRoom = store.select('currentRoom');
        this.loadRooms();
    }

    loadRooms() {
        this.socketService
            .get("room")
            .subscribe(
            (socketItem: ISocketItem) => {
                let room: IRoom = socketItem.item;
                let index: number = this.findIndex(room.name);
                switch (socketItem.action) {
                    case ROOM_ACTIONS.REMOVE_ROOM:
                        this.store.dispatch({type: ROOM_ACTIONS.REMOVE_ROOM, payload: room});
                        break;
                    case ROOM_ACTIONS.CREATE_ROOM:
                        this.store.dispatch({type: ROOM_ACTIONS.CREATE_ROOM, payload: room});
                        break;
                    case ROOM_ACTIONS.UPDATE_ROOM:
                        this.store.dispatch({type: ROOM_ACTIONS.UPDATE_ROOM, payload: room});
                        break;
                    default:
                        this.store.dispatch({type: ROOM_ACTIONS.ADD_ROOM, payload: room});
                        break;
                }
            },
            error => console.log(error)
            );
    }

    // Join room
    join(room: IRoom): void {
        this.store.dispatch({type: ROOM_ACTIONS.SET_CURRENT_ROOM, payload: room});
    }

    // Leave room
    leave(room: IRoom) {
        // First remove the room from user joined rooms
        for (var i = 0; i < this.userService.rooms.length; i++) {
            let room = this.userService.rooms[i];
            if (room.name === name) {
                this.userService.rooms.splice(i, 1);
            }
        }
    }

    // Create room
    create(name: string) {
        this.socketService.emitAction(ROOM_ACTIONS.CREATE_ROOM, name);
    }

    // Remove room
    remove(name: string) {
        // Send signal to remove the room
        this.socketService.emitAction(ROOM_ACTIONS.REMOVE_ROOM, name);
    }

    // Find matching room
    private findIndex(name: string): number {
        return this.list.findIndex((room: IRoom) => {
            return room.name === name;
        });
    }
}