import aws from "aws-sdk";
import dotenv from "dotenv";

//can create url
dotenv.config();
const region = "ap-south-1";
const bucketName = "sample-mern-bucket";

aws.config.update({
  accessId: process.env.AWS_ACCESS_KEY,
  secretKey: process.env.AWS_SECRET_KEY,
});

const accessId = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
  region,
  accessId,
  secretKey,
  signatureVersion: "v4",
});

export const generatePreSignedPutUrl = async (fileName, fileType) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 60,
  };

  let url;
  try {
    url = await s3.getSignedUrlPromise("putObject", params);
  } catch (err) {
    return;
  }

  return url;
};
