import { Component, NgZone } from "@angular/core";

import { RoomService, UserService } from "../shared";

import { IRoom } from "../../models";

declare var require;
const styles: string = require("./control.component.scss");
const template: string = require("./control.component.html");

@Component({
    selector: "control",
    styles: [styles],
    template
})

export class ControlComponent {
    rooms: IRoom[];
    room: string = "";
    newRoom: string = "";
    showRooms: boolean = true;
    showDirect: boolean = true;
    username: string;

    constructor(private zone: NgZone, public roomService: RoomService, public userService: UserService) { }

    // Handle keypress event, for saving nickname
    ngOnInit(): void {
        this.roomService.rooms.subscribe(rooms => {
            this.zone.run(() => {
                this.rooms = rooms;
            });
        });
        this.username = this.userService.nickname;
    }

    toggleRoomsSwitch(): boolean {
        return this.showRooms = !this.showRooms;
    }

    toggleDirectSwitch(): boolean {
        return this.showDirect = !this.showDirect;
    }

    // Join room, when Join-button is pressed
    join(room: string): void {
        this.roomService.join(room);
    }

    // Create room, when Create-button is pressed and empty newRoom text input
    create(): void {
        this.roomService.create(this.newRoom);
        this.newRoom = "";
    }

    // Remove room, when Remove-button is pressed and unset selected room
    remove(): void {
        this.roomService.remove(this.room);
        this.room = "";
    }

    // Handle keypress event (for creating a new room)
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.create();
        }
    }
}
