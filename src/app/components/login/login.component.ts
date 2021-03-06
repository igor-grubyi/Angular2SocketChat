import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { UserService } from "../../services/user.service";

declare var require;
const styles: string = require('./login.component.scss');
const template: string = require('./login.component.html');

@Component({
    selector: 'login',
    styles: [styles],
    template
})

export class LoginComponent implements AfterViewInit {
    @ViewChild('focus') private focus: ElementRef;
    nickname: string;

    constructor(public userService: UserService) {
        this.nickname = userService.user.nickname;
    }

    // After view initialised, focus on nickname text input
    ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
    }

    // Save nickname to user store
    save(): void {
        // this.userService.user.nickname = this.nickname;
        if(this.userService.findIndex(this.nickname) == -1) {
            this.userService.create(this.nickname);
        }
        else {
            this.userService.setUser(this.nickname);
        }
        
    }

    // Handle keypress event, for saving nickname
    eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.save();
        }
    }
}
