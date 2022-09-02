"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
class SocketManager {
    constructor() {
        this.connectedClients = [];
        this.socket = null;
    }
    connect(socket) {
        var _a;
        this.socket = socket;
        const authorization = (_a = socket.handshake.query) === null || _a === void 0 ? void 0 : _a.authorization;
        if (authorization) {
            jsonwebtoken_1.default.verify(authorization.toString(), config_1.default.JWT_SECRET, (error, user) => {
                if (error) {
                    console.log({ error });
                }
                if (user.userId) {
                    this.connectedClients.push({ id: socket.id, userId: user.userId });
                    console.log("---");
                    console.info(`Socket ${socket.id} with user id ${user.userId} has connected.`);
                }
            });
        }
        socket.on("disconnect", () => {
            this.connectedClients = this.connectedClients.filter(({ id }) => id !== socket.id);
            console.info(`Socket ${socket.id} with accesstoken has disconnected.`);
        });
    }
    emitMessage(event, userId, data) {
        if (!this.socket)
            return;
        const socketId = this.getSocketId(userId);
        if (!socketId)
            return;
        this.socket.to(socketId).emit(event, data);
    }
    getSocketId(user) {
        var _a;
        return (_a = this.connectedClients.find(({ userId }) => userId === user)) === null || _a === void 0 ? void 0 : _a.id;
    }
}
exports.default = new SocketManager();
//# sourceMappingURL=SocketManager.js.map