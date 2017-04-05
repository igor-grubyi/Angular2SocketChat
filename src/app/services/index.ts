import { UserService } from './user.service';
import { SocketService } from './socket.service';
import { RoomService } from './room.service';
import { MessageService } from './message.service';

export const services = [
  MessageService,
  UserService,
  RoomService,
  SocketService
]
