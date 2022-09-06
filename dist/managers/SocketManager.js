"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
class SocketManager {
    constructor() {
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
                if (!this.socket)
                    return;
                if (user.userId) {
                    this.socket.join(user.userId);
                    this.joinRoom(user.userId, socket.id);
                    console.info(`Socket ${socket.id} with user id ${user.userId} has connected.`);
                }
            });
        }
        socket.on("disconnect", () => {
            console.info(`Socket ${socket.id} has disconnected.`);
        });
    }
    emitMessage(event, userId, data) {
        if (!this.io) {
            console.log("io not initialized");
            return;
        }
        this.io.to(userId).emit(event, data, (err, success) => {
            if (err) {
                console.log(`Event: ${event} was not emitted to ${userId}`);
                console.log(`Event: ${event} was not emitted due to ${err}`);
            }
            if (success) {
                console.log(`Event: ${event} was emitted to ${userId}`);
            }
        });
    }
    hasRoom(userId) {
        return this.rooms.findIndex(({ name }) => userId === name);
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
    leaveRoom(userId) {
        const index = this.hasRoom(userId);
        if (index < 0) {
            return;
        }
        else {
            this.rooms.splice(index, 1);
        }
    }
}
exports.default = new SocketManager();
//# sourceMappingURL=SocketManager.js.map