import { ROOM_ACTIONS } from "./../../constants";

export const currentRoom = (state: any = [], {type, payload}) => {
  switch (type) {
    case ROOM_ACTIONS.SET_CURRENT_ROOM:
      return payload;
    default:
      return state;
  }
};