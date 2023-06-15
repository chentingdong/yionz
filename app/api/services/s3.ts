import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const baseUrl = 'https://yionz.s3.amazonaws.com';
type Props = {
  fileBuffer: Polly.SynthesizeSpeechOutput.AudioStream;
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
  const url = `${baseUrl}/artifacts/${artifactId}/${clipId}/${filename}`;
  const params = {
    Bucket: process.env.S3_UPLOAD_BUCKET || "yionz",
    Key: url,
    Body: fileBuffer,
    ACL: "public-read",
  };

  try {
    const upload = s3.upload(params);

    upload.on("httpUploadProgress", (p) => {
      console.log(p.loaded / p.total);
    });
    await upload.promise();
    console.log(`S3 file successfully uploaded to: ${url}`);
    return url;
  } catch (error) {
    throw error.message;
  }
};
