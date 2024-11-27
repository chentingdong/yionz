import Replicate from "replicate";


const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

interface GenerateAnimationProps {
  prompt: string;
}

export const generateAnimation = async ({ prompt }: GenerateAnimationProps): Promise<void> => {

  const output = await replicate.run(
    "nateraw/stable-diffusion-videos:2d87f0f8bc282042002f8d24458bbf588eee5e8d8fffb6fbb10ed48d1dac409e",
    {
      input: {
        prompts: "a cat | a dog | a horse"
      }
    }
  );
};