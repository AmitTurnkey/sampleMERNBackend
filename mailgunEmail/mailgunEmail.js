import Mailgun from "mailgun.js";
import FormData from "form-data";
import dotenv from "dotenv";
dotenv.config();

const mailgun = new Mailgun(FormData);
const clientEmail = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

// const sendEmail = mailgun({
//   apiKey: process.env.MAILGUN_API_KEY,
//   domain: process.env.MAILGUN_DOMAIN_NAME,
// });

export default clientEmail;
