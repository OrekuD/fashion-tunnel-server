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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const onSocketConnect_1 = __importDefault(require("./utils/onSocketConnect"));
const routes_1 = __importDefault(require("./routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cloudinary_1 = require("./integrations/cloudinary");
const mongooose_1 = __importDefault(require("./integrations/mongooose"));
const seeder_1 = __importDefault(require("./seeder/seeder"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    (0, cloudinary_1.configureCloudinary)();
    const conn = mongooose_1.default.connection;
    conn.on("error", console.error.bind(console, "connection error:"));
    const server = http_1.default.createServer(app);
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
    });
    app.use((0, cors_1.default)({ origin: "*" }));
    app.use((0, express_fileupload_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    yield (0, seeder_1.default)();
    const socketClients = [];
    const port = process.env.PORT || 4000;
    app.get("/", (_, res) => {
        res.send("Yoo");
    });
    app.use(routes_1.default);
    io.on("connection", (socket) => (0, onSocketConnect_1.default)(socket, socketClients));
    server.listen(port, () => {
        console.info(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});
main();
//# sourceMappingURL=index.js.map