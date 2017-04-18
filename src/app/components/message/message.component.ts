import { Component, OnInit, Input } from '@angular/core';
import { IMessage } from "../../../models";

import { UserService } from './../../services/user.service';

const styles: string = require('./message.component.scss');
const template: string = require('./message.component.html');

@Component({
  selector: 'wom-message',
  styles: [styles],
  template
})

export class MessageComponent implements OnInit {
@Input() message: IMessage;
  constructor(
    public userService: UserService
  ) { }

  ngOnInit() { }

  isOwnMessage(nickname: string): boolean {
    return nickname == this.userService.user.nickname;
  }
}