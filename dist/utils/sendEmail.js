"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const config_1 = __importDefault(require("../config"));
const sendEmail = (to, subject, html) => {
    const API_KEY = config_1.default.MAILGUN_API_KEY;
    const DOMAIN = config_1.default.MAILGUN_DOMAIN;
    if (!API_KEY || !DOMAIN)
        return;
    const mg = (0, mailgun_js_1.default)({
        apiKey: API_KEY,
        domain: DOMAIN,
    });
    const data = {
        from: "no-reply@fashiontunnel",
        to,
        subject,
        html,
    };
    mg.messages().send(data, (error, body) => {
        if (error) {
            console.log({ error });
        }
        console.log(body);
    });
};
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map