import { UserService } from './user.service';
import { SocketService } from './socket.service';
import { RoomService } from './room.service';
import { MessagesService } from './messages.service';

export const services = [
  UserService,
  RoomService,
  SocketService,
  MessagesService
]
