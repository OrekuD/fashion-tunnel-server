import jwt from "jsonwebtoken";
import { Socket, Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Events } from "../types";
import config from "../config";

class SocketManager {
  private connectedClients: Array<{ socketId: string; userId: string }> = [];
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
          if (user.userId) {
            // const index = this.alreadyConnected(user.userId);
            // if (index < 0) {
            //   this.connectedClients.push({
            //     id: socket.id,
            //     userId: user.userId,
            //   });
            //   // console.log("---");
            // } else {
            //   this.connectedClients.splice(index, 1);
            //   this.connectedClients.push({
            //     id: socket.id,
            //     userId: user.userId,
            //   });
            // }
            this.joinRoom(user.userId, socket.id);
            // this.connectedClients.push({
            //   socketId: socket.id,
            //   userId: user.userId,
            // });
            console.info(
              `Socket ${socket.id} with user id ${user.userId} has connected.`
            );
          }
        }
      );
    }

    socket.on("disconnect", () => {
      this.connectedClients = this.connectedClients.filter(
        ({ socketId }) => socketId !== socket.id
      );
      console.info(`Socket ${socket.id} has disconnected.`);
    });
  }

  emitMessage(event: Events, userId: string, data: any) {
    const roomName = this.getRoom(userId);
    if (!roomName) {
      console.log("no room assigned");
      return;
    }
    if (!this.socket) {
      console.log("socket not initialized");
      return;
    }
    if (!this.io) {
      console.log("io not initialized");
      return;
    }
    this.io.to(roomName).emit(event, data, (err: any, success: any) => {
      if (err) {
        console.log(`Event: ${event} was not emitted to ${roomName}`);
        console.log(`Event: ${event} was not emitted due to ${err}`);
      }
      if (success) {
        console.log(`Event: ${event} was emitted to ${roomName}`);
      }
    });
  }

  getSocketId(user: string) {
    return this.connectedClients.find(({ userId }) => userId === user)
      ?.socketId;
  }

  alreadyConnected(user: string) {
    return this.connectedClients.findIndex(({ userId }) => userId === user);
  }

  hasRoom(userId: string) {
    return this.rooms.findIndex(({ name }) => userId === name);
  }

  getRoom(userId: string) {
    return this.rooms.find(({ name }) => userId === name)?.name;
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

  getSocketIds(user: string) {
    return this.connectedClients
      .filter(({ userId }) => userId === user)
      .map(({ socketId }) => socketId);
  }
}

export default new SocketManager();
