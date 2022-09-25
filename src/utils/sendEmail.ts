import mailgun from "mailgun-js";
import config from "../config";

const sendEmail = (to: string, subject: string, html: string) => {
  const API_KEY = config.MAILGUN_API_KEY;
  const DOMAIN = config.MAILGUN_DOMAIN;

  if (!API_KEY || !DOMAIN) return;

  const mg = mailgun({
    apiKey: API_KEY,
    domain: DOMAIN,
  });

  const data:
    | mailgun.messages.SendData
    | mailgun.messages.BatchData
    | mailgun.messages.SendTemplateData = {
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

export default sendEmail;
