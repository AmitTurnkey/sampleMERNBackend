import Client from "twilio";
import dotenv from "dotenv";

// SMS twilio credentials
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = Client(accountSid, authToken);

export default client;
