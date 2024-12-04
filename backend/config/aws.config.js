const AWS = require("aws-sdk");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Set in your environment variables
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Set in your environment variables
  region: process.env.AWS_REGION, // e.g., "us-east-1"
});

module.exports = {
  s3,
};
