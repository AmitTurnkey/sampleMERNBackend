import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import apis from "./routes/apis.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/apis", apis);
app.get("/", (req, res) => {
  res.send("Respone sent from server...");
});

const MONGOURL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database Connected...");
    app.listen(PORT, () => {
      console.log(`Server is Running in PORT = ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Something went wrong!! = ${err}`);
  });
