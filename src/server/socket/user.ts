import { IUser, User } from "../../models";

export class UserSocket {
    nsp: any;
    name: string;
    data: any;
    socket: any;

    constructor(io: any) {
        this.nsp = io.of("/user");
        this.nsp.on("connection", (socket: any) => {
            this.socket = socket;
            this.listen();
        });
    }

    // Add signal
    private listen(): void {
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("create", (User: IUser) => this.create(User));
        this.socket.on("list", () => this.list());
    }

    // Handle disconnect
    private disconnect(): void {
        // console.log("Client disconnected from room:", this.room);
    }

    // Create a User
    private create(user: IUser): void {
        User.create(user, (error: any, user: IUser) => {
            console.log('socket')
            if (!error && user) {
                this.nsp.emit("create", user);
            }
        });
    }

    // List all Users
    private list(): void {
        if (this.socket && this.socket.connected) {
            User
                .find() // Find Users only on this room
                .sort({ created: -1 }) // Sort newest Users first
                .limit(25) // Limit to 25 first results
                .exec( 
                    (error: any, Users: IUser[]) => {
                        for (let User of Users.reverse()) {
                            this.socket.emit("create", User);
                        }
                    }
                );
        }
    }
}