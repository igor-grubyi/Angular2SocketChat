import * as mongoose from "mongoose";

export interface IUser{
    nickname: string;
}

export interface IUserModel extends IUser, mongoose.Document {}
 
export var UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        unique: true
    }
});

export var User = mongoose.model<IUserModel>("User", UserSchema);
