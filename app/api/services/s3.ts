import { AudioStream } from "aws-sdk/clients/polly";
import { S3 } from "aws-sdk";

export const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const baseUrl = process.env.S3_BASE_URL;

export const s3Upload = async ({
  fileBuffer,
  filename,
  artifactId,
  clipId,
}: {
  fileBuffer: AudioStream | ReadableStream | Buffer;
  filename: string;
  artifactId: string;
  clipId: string;
}): Promise<string> => {
  const keyPath = `artifacts/${artifactId}/${clipId}/${filename}`;
  const params = {
    Bucket: process.env.S3_UPLOAD_BUCKET || "yionz",
    Key: keyPath,
    Body: fileBuffer,
    ACL: "public-read",
  };

  try {
    console.log(`Uploading data to AWS S3...`);
    const upload = s3.upload(params);
    await upload.promise();
    const url = `${baseUrl}/${keyPath}`;
    console.log(`S3 file successfully uploaded to: ${url}`);
    return url;
  } catch (error) {
    console.log(`S3 file upload failed.`);
    throw error;
  }
};

export const s3Delete = async (keyPath: string) => {
  try {
    const deleteObject = s3.deleteObject({
      Bucket: process.env.S3_UPLOAD_BUCKET || "yionz",
      Key: keyPath
    });
    deleteObject.promise();
    const url = `${baseUrl}/${keyPath}`;
    console.log(`S3 file successfully deleted: ${url}`);
  } catch (error) {
    console.log(`S3 delete file failed.`);
    throw error;
  }
};