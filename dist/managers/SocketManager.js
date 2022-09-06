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
        this.rooms = [];
        this.socket = null;
        this.io = null;
    }
    connect(socket, io) {
        var _a;
        this.socket = socket;
        this.io = io;
        const authorization = (_a = socket.handshake.query) === null || _a === void 0 ? void 0 : _a.authorization;
        if (authorization) {
            jsonwebtoken_1.default.verify(authorization.toString(), config_1.default.JWT_SECRET, (error, user) => {
                if (error) {
                    console.log({ error });
                }
                if (user.userId) {
                    this.joinRoom(user.userId, socket.id);
                    console.info(`Socket ${socket.id} with user id ${user.userId} has connected.`);
                }
            });
        }
        socket.on("disconnect", () => {
            this.connectedClients = this.connectedClients.filter(({ socketId }) => socketId !== socket.id);
            console.info(`Socket ${socket.id} has disconnected.`);
        });
    }
    emitMessage(event, userId, data) {
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
        this.io.to(roomName).emit(event, data, (err, success) => {
            if (err) {
                console.log(`Event: ${event} was not emitted to ${roomName}`);
                console.log(`Event: ${event} was not emitted due to ${err}`);
            }
            if (success) {
                console.log(`Event: ${event} was emitted to ${roomName}`);
            }
        });
    }
    getSocketId(user) {
        var _a;
        return (_a = this.connectedClients.find(({ userId }) => userId === user)) === null || _a === void 0 ? void 0 : _a.socketId;
    }
    alreadyConnected(user) {
        return this.connectedClients.findIndex(({ userId }) => userId === user);
    }
    hasRoom(userId) {
        return this.rooms.findIndex(({ name }) => userId === name);
    }
    getRoom(userId) {
        var _a;
        return (_a = this.rooms.find(({ name }) => userId === name)) === null || _a === void 0 ? void 0 : _a.name;
    }
    joinRoom(userId, socketId) {
        const index = this.hasRoom(userId);
        if (index < 0) {
            this.rooms.push({
                name: userId,
                users: [{ socketId, userId }],
            });
        }
        else {
            const user = this.rooms[index];
            this.rooms.splice(index, 1, {
                name: user.name,
                users: [...user.users, { socketId, userId }],
            });
        }
    }
    getSocketIds(user) {
        return this.connectedClients
            .filter(({ userId }) => userId === user)
            .map(({ socketId }) => socketId);
    }
}
exports.default = new SocketManager();
//# sourceMappingURL=SocketManager.js.map