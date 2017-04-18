import { MESSAGE_ACTIONS } from "./../../constants";
import { IMessage } from "./../../models";

let messages_arr: IMessage[] = [];

const addMessage = (message: IMessage): Array<IMessage> => {
  messages_arr.push(message);
  return messages_arr;
}

export const messages = (state: any = [], {type, payload}) => {
  switch (type) {
    case MESSAGE_ACTIONS.RESET_MESSAGES:
      state.splice(0, state.length);
      return state;
    case MESSAGE_ACTIONS.ADD_MESSAGES:
      return addMessage(payload);
    case MESSAGE_ACTIONS.CREATE_MESSAGE:
      return [...state, payload];
    case 'UPDATE_ITEM':
      return state.map(item => {
        return item.id === payload.id ? Object.assign({}, item, payload) : item;
      });
    case 'DELETE_ITEM':
      return state.filter(item => {
        return item.id !== payload.id;
      });
    default:
      return state;
  }
};