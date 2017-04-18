import { Component, NgZone } from "@angular/core";

import { RoomService } from "../../services/room.service";
import { IRoom } from "../../../models";

declare var require;
const styles: string = require("./rooms.component.scss");
const template: string = require("./rooms.component.html");

@Component({
    selector: "rooms",
    styles: [styles],
    template
})

export class RoomsComponent {
    currentRoom: IRoom;
    constructor(public roomService: RoomService, private zone: NgZone) {
        this.roomService.currentRoom.subscribe((room)=>{
            this.zone.run(()=>{
                this.currentRoom = room;
            })
        })
    }
}
