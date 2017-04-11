import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

import { IMessage, ISocketItem } from "../../models";
import { MESSAGE_ACTIONS, USER_ACTIONS, ROOM_ACTIONS } from "../../constants";

@Injectable()
export class SocketService {
    private name: string;
    private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    socket: SocketIOClient.Socket;

    constructor() {}

    // Get items observable
    get(name: string): Observable<any> {
        this.name = name;
        let socketUrl = this.host + "/" + this.name;
        this.socket = io.connect(socketUrl);
        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });

        // Return observable which follows "create" and "remove" signals from socket stream
        return Observable.create((observer: any) => {
            this.setupActionListeners([MESSAGE_ACTIONS, ROOM_ACTIONS, USER_ACTIONS], observer)
            return () => this.socket.close();
        });
    }

    setupActionListeners(actions: Array<Object>, observer: any) {
        actions.map((action) => {
            Object.keys(action).map((key)=>{
                this.socket.on(action[key], (item: any) => observer.next({ action: action[key], item: item }) );
            })
        })
    }

    emitAction(action: string, payload: any) {
        this.socket.emit(action, payload)
    }

    // Handle connection opening
    private connect() {
        console.log(`Connected to "${this.name}"`);

        // Request initial list when connected
        this.socket.emit("list");
    }

    // Handle connection closing
    private disconnect() {
        console.log(`Disconnected from "${this.name}"`);
    }
}
