"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getForgotPasswordTemplate = (name, code) => {
    const year = new Date().getFullYear();
    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>
        <body>
            <table style="width: 100%">
            <tr>
                <td
                style="
                    background: #3461fd;
                    padding: 10px 10px;
                    text-align: center;
                    vertical-align: middle;
                "
                >
                <img
                    src="https://res.cloudinary.com/orekud/image/upload/v1664065704/fashion_tunnel/assets/ft_logo_voeupc.png"
                    alt="fashion-tunnel-logo"
                    style="width: 210px; height: 48px; object-fit: contain"
                />
                </td>
            </tr>
            <tr>
                <td>
                <p>Hello, ${name}</p>
                <p>We received a request to reset your password.</p>
                <p>Enter the code below to reset it</p>
                <p style="text-align: center; font-size: 24px; font-weight: 500">
                    ${code}
                </p>
                <p>This code will expire in 2 minutes.</p>
                <p>
                    If this was a mistake, just ignore this email and nothing will
                    happen
                </p>
                </td>
            </tr>
            <tr>
                <td
                style="
                    background: #3461fd;
                    padding: 20px 40px;
                    text-align: center;
                    vertical-align: middle;
                    color: #ffffff !important;
                "
                >
                <p style="color: #ffffff !important">
                    Copyright &copy; ${year}
                    <span style="font-weight: 500">FashionTunnel</span>. All rights
                    reserved.
                    </p>
                </td>
            </tr>
            </table>
        </body>
        </html>
    `;
};
exports.default = getForgotPasswordTemplate;
//# sourceMappingURL=getForgotPasswordTemplate.js.map