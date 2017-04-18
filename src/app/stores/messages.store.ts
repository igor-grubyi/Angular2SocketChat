import { MESSAGE_ACTIONS } from "./../../constants";

export const messages = (state: any = [], {type, payload}) => {
  switch (type) {
    case MESSAGE_ACTIONS.ADD_MESSAGES:
      return payload;
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