import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import config from "../config";

class SocketManager {
  private connectedClients: Array<{ id: string; userId: string }> = [];
  private socket: Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
  > | null = null;

  constructor() {}

  connect(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) {
    this.socket = socket;
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
            const index = this.alreadyConnected(user.userId);
            if (index < 0) {
              this.connectedClients.push({
                id: socket.id,
                userId: user.userId,
              });
              // console.log("---");
            } else {
              // this.connectedClients.splice(index, 1);
              this.connectedClients.push({
                id: socket.id,
                userId: user.userId,
              });
            }
            console.info(
              `Socket ${socket.id} with user id ${user.userId} has connected.`
            );
          }
        }
      );
    }

    socket.on("disconnect", () => {
      console.log({ beforelength: this.connectedClients.length });
      this.connectedClients = this.connectedClients.filter(
        ({ id }) => id !== socket.id
      );
      console.log({ afterlength: this.connectedClients.length });
      console.info(`Socket ${socket.id} has disconnected.`);
    });
  }

  emitMessage(event: string, userId: string, data: any) {
    const socketIds = this.getSocketIds(userId);
    if (socketIds.length === 0) return;
    socketIds.forEach((socketId) => {
      if (!this.socket) return;
      this.socket.to(socketId).emit(event, data, (err: any, success: any) => {
        if (err) {
          console.log(`Event: ${event} was not emmitted`);
        }
        if (success) {
          console.log(`Event: ${event} was emmitted ${success}`);
        }
      });
    });
  }

  getSocketId(user: string) {
    return this.connectedClients.find(({ userId }) => userId === user)?.id;
  }

  alreadyConnected(user: string) {
    return this.connectedClients.findIndex(({ userId }) => userId === user);
  }

  getSocketIds(user: string) {
    return this.connectedClients
      .filter(({ userId }) => userId === user)
      .map(({ id }) => id);
  }
}

export default new SocketManager();
