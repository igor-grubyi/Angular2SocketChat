import { Component, OnInit, Input } from '@angular/core';

import { IMessage } from "../../../models";

const styles: string = require('./messages-list.component.scss');
const template: string = require('./messages-list.component.html');

@Component({
  selector: 'wom-messages-list',
  styles: [styles],
  template
})

export class MessagesListComponent implements OnInit {
  @Input() messages: IMessage[];
  constructor() { }

  ngOnInit() { }



}