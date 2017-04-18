import { Component, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';

import { RoomService } from './../../services/room.service';
import { UserService } from './../../services/user.service';
import { IMessage, IRoom, AppStore } from "../../../models";

import { Store } from '@ngrx/store';
import { MessagesService } from './../../services/messages.service';

import { Observable } from "rxjs";

declare var require;
const styles: string = require('./room.component.scss');
const template: string = require('./room.component.html');

@Component({
  selector: 'room',
  styles: [styles],
  providers: [MessagesService],
  template
})

export class RoomComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scroll') private scroll: ElementRef;
  @ViewChild('focus') private focus: ElementRef;
  @Input() room: IRoom;
  message: string = "";
  messages: Array<IMessage>;
  private alreadyLeftChannel: boolean = false;

  constructor(
    private zone: NgZone,
    private roomService: RoomService,
    public userService: UserService,
    private store: Store<AppStore>,
    private messagesService: MessagesService,
  ) { 
  }

  ngOnInit(): void {
    this.initMessages();
  }

  initMessages() {
    this.messagesService.messages.subscribe((messages)=>{
      this.zone.run(()=>{
        this.messages = messages;
        setTimeout(() => {
          this.scrollToBottom();
        }, 200);
      })
    });
    this.messagesService.loadMessagesForRoom(this.room.name);
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

  isOwnMessage(nickname: string): boolean {
    return nickname == this.userService.user.nickname;
  }

  // Send chat message, and reset message text input
  send(): void {
    this.messagesService.sendMessageToRoom(this.userService.user.nickname, this.message, this.room.name);
    this.message = "";
  }

  // Leave room gracefully
  leave(): void {
    this.alreadyLeftChannel = true;
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
