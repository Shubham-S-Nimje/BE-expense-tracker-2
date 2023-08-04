const AWS = require("aws-sdk");

const uploadToS3 = async (data, filename) => {
  const BUCKET_NAME = "expense-tracker-app-0408";
  const IAM_USER_KEY = "AKIAZDLCDKVCJ5LDFXG2";
  const IAM_USER_SECRET = "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";

  const s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  const params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };

  try {
    const s3response = await s3bucket.upload(params).promise();
    console.log("File uploaded successfully:", s3response.Location);
    return s3response.Location;
  } catch (err) {
    console.log("Error uploading file to S3:", err);
    throw err;
  }
};

module.exports = uploadToS3;
