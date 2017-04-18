import {IMessage, IRoom} from './index';

export interface AppStore {
  messages: IMessage[],
  rooms: IRoom[],
  currentRoom: IRoom,
};