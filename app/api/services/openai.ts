import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export async function chatGPT(artifact: Prisma.artifact) {
  const instruction = artifact.template.instructions.chatgpt;
  const prompt = [instruction, artifact.prompt].join('. ');
  const parameters = {
    prompt: prompt,
    model: "text-davinci-003",
    max_tokens: artifact.template.params?.chatgpt?.maxTokens,
    temperature: artifact.template.params?.chatgpt?.temperature
  };

  console.log('Call to chatgpt: ', parameters);

  try {
    const response = await openai.createCompletion(parameters);
    console.log('chatgpt response: \n', response.data);
    const answer = response.data.choices?.[0].text || '';
    return answer;
  } catch (error) {
    console.log(error);
    return '';
  }
};
