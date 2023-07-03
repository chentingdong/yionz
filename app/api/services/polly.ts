import AWS from "aws-sdk";
import { AudioStream } from "aws-sdk/clients/polly";
import { PollyParamsProps } from "@/app/[lang]/[id]/(steps)/step2/audio.actions";
import { ja } from "date-fns/locale";

const polly = new AWS.Polly({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});

export const textToSpeechPolly = async (
  text: string,
  pollyParams: PollyParamsProps
): Promise<AudioStream> => {
  return new Promise((resolve, reject) => {
    const params = {
      ...pollyParams,
      Text: `<speak>${text}</speak>`,
      TextType: "ssml",
      OutputFormat: "mp3",
    };
    console.log(`Sending to AWS Polly to build audio data using params:\n${JSON.stringify(params, null, 2)}`);

    polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.error(err.message);
        reject(err.message);
      } else if (data) {
        console.log('polly response data:', data)
        if (data.AudioStream instanceof Buffer) {
          console.log('AWS Polly successfully generated audio data.');
          resolve(data.AudioStream);
        }
      }
    });
  });
};
