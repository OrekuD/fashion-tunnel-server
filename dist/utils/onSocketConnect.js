"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const onSocketConnect = (socket, socketClients) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authorization = (_a = socket.handshake.query) === null || _a === void 0 ? void 0 : _a.authorization;
    if (authorization) {
        jsonwebtoken_1.default.verify(authorization.toString(), config_1.default.JWT_SECRET, (error, user) => {
            if (error) {
                console.log({ error });
            }
            if (user.userId) {
                socketClients.push({ id: socket.id, userId: user.userId });
                console.log("---");
                console.info(`Socket ${socket.id} with user id ${user.userId} has connected.`);
            }
        });
    }
    socket.on("disconnect", () => {
        socketClients = socketClients.filter(({ id }) => id !== socket.id);
        console.info(`Socket ${socket.id} with accesstoken has disconnected.`);
    });
});
exports.default = onSocketConnect;
//# sourceMappingURL=onSocketConnect.js.map