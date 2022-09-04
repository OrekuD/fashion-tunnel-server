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
                    const index = this.alreadyConnected(user.userId);
                    if (index < 0) {
                        this.connectedClients.push({
                            id: socket.id,
                            userId: user.userId,
                        });
                    }
                    else {
                        this.connectedClients.splice(index, 1);
                        this.connectedClients.push({
                            id: socket.id,
                            userId: user.userId,
                        });
                    }
                    console.info(`Socket ${socket.id} with user id ${user.userId} has connected.`);
                }
            });
        }
        socket.on("disconnect", () => {
            this.connectedClients = this.connectedClients.filter(({ id }) => id !== socket.id);
            console.info(`Socket ${socket.id} has disconnected.`);
        });
    }
    emitMessage(event, userId, data) {
        const socketIds = this.getSocketIds(userId);
        if (socketIds.length === 0) {
            console.log("no socket ids found");
            return;
        }
        socketIds.forEach((socketId) => {
            if (!this.socket) {
                console.log("socket not initialized");
                return;
            }
            this.socket.to(socketId).emit(event, data, (err, success) => {
                if (err) {
                    console.log(`Event: ${event} was not emmitted to ${socketId}`);
                }
                if (success) {
                    console.log(`Event: ${event} was emmitted to ${socketId}`);
                }
            });
        });
    }
    getSocketId(user) {
        var _a;
        return (_a = this.connectedClients.find(({ userId }) => userId === user)) === null || _a === void 0 ? void 0 : _a.id;
    }
    alreadyConnected(user) {
        return this.connectedClients.findIndex(({ userId }) => userId === user);
    }
    getSocketIds(user) {
        return this.connectedClients
            .filter(({ userId }) => userId === user)
            .map(({ id }) => id);
    }
}
exports.default = new SocketManager();
//# sourceMappingURL=SocketManager.js.map