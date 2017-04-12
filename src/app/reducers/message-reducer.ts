import { IAction } from "../../models/action.model";

import { MESSAGE_ACTIONS } from "./../../constants/message_actions";

export const messageReducer = (state: any = 0, action: IAction) => {
  switch (action.type) {
    case MESSAGE_ACTIONS.ADD_MESSAGES:
      return action.payload;
    default:
      return state;
  }
}