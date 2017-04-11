import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { List } from "immutable";

import { SocketService } from "./socket.service";
import { UserService } from "./user.service";

import { IRoom, ISocketItem } from "../../models";

import { ROOM_ACTIONS } from "../../constants";

@Injectable()
export class RoomService {
    rooms: ReplaySubject<any> = new ReplaySubject(1);
    private list: List<any> = List();

    constructor(
        private socketService: SocketService,
        private userService: UserService
    ) {
        this.socketService
            .get("room")
            .subscribe(
            (socketItem: ISocketItem) => {
                let room: IRoom = socketItem.item;
                let index: number = this.findIndex(room.name);
                if (socketItem.action === ROOM_ACTIONS.REMOVE_ROOM) {
                    // Remove
                    this.list = this.list.delete(index);
                } else {
                    if (index === -1) {
                        // Create
                        this.list = this.list.push(room);
                    } else {
                        // Update
                        this.list = this.list.set(index, room)
                    }
                }
                this.rooms.next(this.list);
            },
            error => console.log(error)
            );
    }

    // Join room
    join(name: string): void {
        if (this.userService.currentRoom) {
            this.leave(this.userService.currentRoom.name);
        }
        for (let roomIndex in this.userService.rooms) {
            let room = this.userService.rooms[roomIndex];
            if (room.name === name) {
                return;
            }
        }
        let index = this.findIndex(name);
        if (index !== -1) {
            let room = this.list.get(index);
            this.userService.rooms.push(room);
            this.userService.currentRoom = room;
        }
    }

    // Leave room
    leave(name: string) {
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
        // First remove the room from user joined rooms
        for (var i = 0; i < this.userService.rooms.length; i++) {
            let room = this.userService.rooms[i];
            if (room.name === name) {
                this.userService.rooms.splice(i, 1);
            }
        }

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