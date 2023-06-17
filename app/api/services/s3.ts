import { AudioStream } from "aws-sdk/clients/polly";
import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const baseUrl = 'https://yionz.s3.amazonaws.com';
type Props = {
  fileBuffer: AudioStream | ReadableStream | Buffer;
  filename: string;
  artifactId: string;
  clipId: string;
};

export const s3Upload = async ({
  fileBuffer,
  filename,
  artifactId,
  clipId,
}: Props): Promise<string> => {
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
