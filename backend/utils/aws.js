const { s3 } = require("../config/aws.config");

const uploadFileToS3 = async (file) => {
  try {
    const uploadedFiles = {};
    let key = `uploads/${file.fieldname}.${file.mimetype.split("/")[1]}`;
    const uploadParams = {
      Bucket: "form-builder-temp", // Your S3 bucket name
      Key: key, // Unique key
      Body: file.buffer, // File content
      ContentType: file.mimetype, // MIME type
    };

    const uploadResult = await s3.upload(uploadParams).promise(); // Upload to S3
    uploadedFiles[file.fieldname] = uploadResult.Location; // Save the URL
    return key;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

const getPublicUrl = async (key, signedUrlExpireSeconds) => {
  try {
    const params = {
      Bucket: "form-builder-temp", // Your S3 bucket name
      Key: key, // The key of the object
      Expires: signedUrlExpireSeconds,
    };

    const url = await s3.getSignedUrlPromise("getObject", params);
    return url;
  } catch (error) {
    console.error("Error getting public URL:", error);
  }
};

const removeFileFromS3 = async (key) => {
  try {
    const params = {
      Bucket: "form-builder-temp", // Your S3 bucket name
      Key: key, // The key of the object
    };

    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error("Error removing file:", error);
  }
};

module.exports = {
  uploadFileToS3,
  getPublicUrl,
  removeFileFromS3,
};
