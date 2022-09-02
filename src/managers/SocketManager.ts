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
            this.connectedClients.push({ id: socket.id, userId: user.userId });
            console.log("---");
            console.info(
              `Socket ${socket.id} with user id ${user.userId} has connected.`
            );
          }
        }
      );
    }

    socket.on("disconnect", () => {
      this.connectedClients = this.connectedClients.filter(
        ({ id }) => id !== socket.id
      );
      console.info(`Socket ${socket.id} with accesstoken has disconnected.`);
    });
  }

  emitMessage(event: string, userId: string, data: any) {
    if (!this.socket) return;
    const socketId = this.getSocketId(userId);
    if (!socketId) return;
    this.socket.to(socketId).emit(event, data);
  }

  getSocketId(user: string) {
    return this.connectedClients.find(({ userId }) => userId === user)?.id;
  }
}

export default new SocketManager();
