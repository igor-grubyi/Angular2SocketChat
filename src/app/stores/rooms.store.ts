import { ROOM_ACTIONS } from "./../../constants";
import { IRoom } from "./../../models";

let roomsList: IRoom[] = [];

const addRoom = (room: IRoom): Array<IRoom> => {
  roomsList.push(room);
  return roomsList;
}

export const rooms = (state: any = [], {type, payload}) => {
  switch (type) {
    case ROOM_ACTIONS.ADD_ROOM:
      return addRoom(payload);
    case ROOM_ACTIONS.CREATE_ROOM:
      return [...state, payload];
    case ROOM_ACTIONS.UPDATE_ROOM:
      return state.map(room => {
        return room.name === payload.name ? Object.assign({}, room, payload) : room;
      });
    case ROOM_ACTIONS.REMOVE_ROOM:
      return state.filter(room => {
        return room.name !== payload.name;
      });
    default:
      return state;
  }
};