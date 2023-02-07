import express from "express";
import mongoose from "mongoose";
import FormDetails from "../models/FormDetails.js";
import { generatePreSignedPutUrl } from "../s3/s3.js";
import client from "../twilioSms/twilioapi.js";
import NodeCache from "node-cache";
import generateRandomOTP from "../twilioSms/otp.js";
import clientEmail from "../mailgunEmail/mailgunEmail.js";

const router = express.Router();
const cache = new NodeCache(); // create cache
router.post("/submitForm", async (req, res) => {
  const {
    investmentDetails,
    applicantDetails,
    bankingPreference,
    nomineeDetails,
    investmentRisk,
  } = req.body;

  try {
    const result = await FormDetails.create({
      investmentDetails: investmentDetails,
      applicantDetails: applicantDetails,
      bankingPreference: bankingPreference,
      nomineeDetails: nomineeDetails,
      investmentRisk: investmentRisk,
    });

    return res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something Went Wrong!!" });
  }
});

// contact verification
router.post("/send-sms", async (req, res) => {
  const { contact } = req.body;
  console.log(contact);
  if (contact.length === 10) {
    const otp = generateRandomOTP(); // TODO Store this otp in cache with phone number later use it to verification
    const isSuccess = cache.set(`Contact:${contact}`, otp, 60); //60 is in seconds
    if (isSuccess) {
      client.messages
        .create({
          body: `Please Enter this OTP ${otp}`,
          messagingServiceSid: "MGd5f0e6b1ebab80183f6097c745b51a2b",

          to: `+91${contact}`,
        })
        .then((message) => console.log(message.sid))
        .catch((err) => {
          res.status(400).json({ error: "Something Went Wrong" });
        })
        .done();

      res
        .status(200)
        .json({ message: "OTP Sent Successfully.Kindly check messages" });
    } else {
      res.status(500).json({ error: "Something Went wrong" });
    }
  } else {
    res.status(400).json({ error: "Contact No. is Wrong" });
  }
});

// verify otp

router.post("/verify-contact-otp", (req, res) => {
  const { contact, otp } = req.body;
  const getOtpFromCache = cache.get(`Contact:${contact}`);
  if (getOtpFromCache === otp) {
    //TODO save contact to database
    return res.status(200).json({ message: "Otp verification successfull" });
  } else {
    return res.status(200).json({ error: "Wrong otp entered !!" });
  }
});

//email verification

router.post("/send-email", (req, res) => {
  const { email } = req.body;
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // for checking correct email
  if (email.match(validRegex)) {
    const messageData = {
      from: "Excited User <me@samples.mailgun.org>",
      to: "thapliyalamit2001@gmail.com",
      subject: "Hello",
      text: "Testing some Mailgun awesomeness!",
    };

    clientEmail.messages
      .create(
        "sandboxc9af5114f90541cdb1af7f171a958d16.mailgun.org",
        messageData
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    // const data = {
    //   from: "Excited User <thapliyalamit2001@gmail.com>",
    //   to: "devisudha271973@gmail.com",
    //   subject: "Hello",
    //   text: "Testing some Mailgun awesomness!",
    // };
    // sendEmail.messages().send(data, (err, body) => {
    //   console.log(body);
    // });

    return res
      .status(200)
      .json({ message: "OTP sent successfully. Kindly check email" });
  } else {
    return res.status(400).json({ error: "Wrong Email" });
  }
});

router.post("/s3url", async (req, res) => {
  let url;
  try {
    url = await generatePreSignedPutUrl(req.body.fileName, req.body.fileType);
  } catch (err) {
    res.status(500).send({ ok: false, error: `failed to get url: ${err}` });
    return;
  }
  res.send({ url });
});

export default router;
