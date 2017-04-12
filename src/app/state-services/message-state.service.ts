import { Injectable } from "@angular/core";
import { StateService } from "./abstract.state.service";
import { MessagesState, IMessage } from "../../models";

@Injectable()
export class MessagesStateService extends StateService<MessagesState> {
  constructor() {
    super();
  }

  initialState(): MessagesState {
    return { messages: [] };
  }

  refreshMessages(messages): void {
    let state: MessagesState = this.getValue();
    console.log(state)
  }
}
