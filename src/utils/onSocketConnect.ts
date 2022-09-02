import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import config from "../config";

const onSocketConnect = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socketClients: Array<{ id: string; userId: string }>
) => {
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
          socketClients.push({ id: socket.id, userId: user.userId });
          console.log("---");
          console.info(
            `Socket ${socket.id} with user id ${user.userId} has connected.`
          );
        }
      }
    );
  }

  socket.on("disconnect", () => {
    socketClients = socketClients.filter(({ id }) => id !== socket.id);
    console.info(`Socket ${socket.id} with accesstoken has disconnected.`);
  });
};

export default onSocketConnect;
