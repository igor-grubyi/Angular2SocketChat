import { Component, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';

import { RoomService } from './../../services/room.service';
import { UserService } from './../../services/user.service';
import { SocketService } from './../../services/socket.service';
import { IMessage, IRoom } from "../../../models";

import { MessageService } from "./../../services/message.service";

declare var require;
const styles: string = require('./room.component.scss');
const template: string = require('./room.component.html');

@Component({
    selector: 'room',
    styles: [styles],
    template
})

export class RoomComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('scroll') private scroll: ElementRef;
    @ViewChild('focus') private focus: ElementRef;
    @Input() room: IRoom;
    message: string = "";
    messages: IMessage[];
    private messageService: MessageService;
    private alreadyLeftChannel: boolean = false;

    constructor(
        private zone: NgZone,
        private roomService: RoomService,
        public userService: UserService,
        public socketService: SocketService
    ) { }

    // Handle keypress event, for saving nickname
    ngOnInit(): void {
        this.getRoomMessages();
    }

    ngOnChanges(): void {
        this.getRoomMessages();
    }

    // After view initialized, focus on chat message text input
    ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
    }

    // When component is destroyed, ensure that leave message is sent
    ngOnDestroy(): void {
        if (!this.alreadyLeftChannel) {
            this.leave();
        }
    }

    getRoomMessages(): void {
        this.messageService = new MessageService(this.room.name);
        this.messageService.messages.subscribe(messages => {
            this.zone.run(() => {
                this.messages = messages;
                setTimeout(() => {
                    this.scrollToBottom();
                }, 200);
            });
        });
        this.messageService.create(this.userService.nickname, "joined the channel");
    }

    isOwnMessage(nickname: string): boolean {
        return nickname == this.userService.nickname;
    }

    // Send chat message, and reset message text input
    send(): void {
        console.log("Send")
        this.messageService.create(this.userService.nickname, this.message);
        this.message = "";
    }

    // Leave room gracefully
    leave(): void {
        this.alreadyLeftChannel = true;
        this.messageService.create(this.userService.nickname, "left the channel");
        this.roomService.leave(this.room.name);
    }

    //* Scroll to bottom (this is called when new message is received)
    scrollToBottom(): void {
        try {
            this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
        } catch (error) {
            console.log("ERROR:", error);
        }
    }

    // Handle keypress event, for sending chat message
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.send();
        }
    }
}
