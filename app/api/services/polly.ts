import AWS from "aws-sdk";
import { AudioStream } from "aws-sdk/clients/polly";

const polly = new AWS.Polly({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});

export const textToSpeechPolly = async (
  text: string
): Promise<AudioStream> => {
  return new Promise((resolve, reject) => {
    let pollyparams = {
      Text: `<speak>${text}</speak>`,
      TextType: "ssml",
      OutputFormat: "mp3",
      VoiceId: "Amy",
    };
    console.log('Sending to AWS Polly to build audio data...');

    polly.synthesizeSpeech(pollyparams, (err, data) => {
      if (err) {
        console.error(err.message);
        reject(err.message);
      } else if (data) {
        if (data.AudioStream instanceof Buffer) {
          console.log('AWS Polly successfully generated audio data.');
          resolve(data.AudioStream);
        }
      }
    });
  });
};
