import * as mongoose from "mongoose";
import { IUser } from "./user.model";

export interface IRoom {
    name: string;
    users: IUser[];
    isDirect: boolean;
    created: Date;
}

export interface IRoomModel extends IRoom, mongoose.Document {}
 
export var RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    isDirect: Boolean,
    users: Array,
    created: Date
});

export var Room = mongoose.model<IRoomModel>("Room", RoomSchema);
