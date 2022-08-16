import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const onSocketConnect = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socketClients: Array<string>
) => {
  console.info(`Socket ${socket.id} has connected.`);
  socketClients.push(socket.id);

  socket.on("disconnect", () => {
    socketClients = socketClients.filter((client) => client !== socket.id);
    console.info(`Socket ${socket.id} has disconnected.`);
  });
};

export default onSocketConnect;
