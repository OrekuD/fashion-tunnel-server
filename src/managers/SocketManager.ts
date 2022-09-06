import jwt from "jsonwebtoken";
import { Socket, Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Events } from "../types";
import config from "../config";

class SocketManager {
  private rooms: Array<{
    name: string;
    users: Array<{ userId: string; socketId: string }>;
  }> = [];
  private socket: Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
  > | null = null;
  private io: Server<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
  > | null = null;

  constructor() {}

  connect(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) {
    this.socket = socket;
    this.io = io;
    const authorization = socket.handshake.query?.authorization;

    if (authorization) {
      jwt.verify(
        authorization.toString(),
        config.JWT_SECRET as string,
        (error: any, user: any) => {
          if (error) {
            console.log({ error });
          }

          if (!this.socket) return;

          if (user.userId) {
            this.socket.join(user.userId);
            this.joinRoom(user.userId, socket.id);
            console.info(
              `Socket ${socket.id} with user id ${user.userId} has connected.`
            );
          }
        }
      );
    }

    socket.on("disconnect", () => {
      console.info(`Socket ${socket.id} has disconnected.`);
    });
  }

  emitMessage(event: Events, userId: string, data: any) {
    if (!this.io) {
      console.log("io not initialized");
      return;
    }
    this.io.to(userId).emit(event, data, (err: any, success: any) => {
      if (err) {
        console.log(`Event: ${event} was not emitted to ${userId}`);
        console.log(`Event: ${event} was not emitted due to ${err}`);
      }
      if (success) {
        console.log(`Event: ${event} was emitted to ${userId}`);
      }
    });
  }

  hasRoom(userId: string) {
    return this.rooms.findIndex(({ name }) => userId === name);
  }

  joinRoom(userId: string, socketId: string) {
    const index = this.hasRoom(userId);
    if (index < 0) {
      this.rooms.push({
        name: userId,
        users: [{ socketId, userId }],
      });
    } else {
      const user = this.rooms[index];
      this.rooms.splice(index, 1, {
        name: user.name,
        users: [...user.users, { socketId, userId }],
      });
    }
  }

  leaveRoom(userId: string) {
    const index = this.hasRoom(userId);

    if (index < 0) {
      return;
    } else {
      this.rooms.splice(index, 1);
    }
  }
}

export default new SocketManager();
