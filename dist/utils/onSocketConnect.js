"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onSocketConnect = (socket, socketClients) => {
    console.info(`Socket ${socket.id} has connected.`);
    socketClients.push(socket.id);
    socket.on("disconnect", () => {
        socketClients = socketClients.filter((client) => client !== socket.id);
        console.info(`Socket ${socket.id} has disconnected.`);
    });
};
exports.default = onSocketConnect;
//# sourceMappingURL=onSocketConnect.js.map