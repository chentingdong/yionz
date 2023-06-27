export const apiSdVideosPost = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "Cache-Control": "no-cache",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
};

export interface RequestProps {
  prompts: string[];
  width: number;
  height: number;
  num_interpolation_steps: number;
  fps: number;
}

export const sdTxt2Video = async (req: RequestProps): Promise<string> => {
  try {
    const body = {
      ...req,
      seed: Math.floor(Math.random() * 9999),
    };

    console.log(`api call to sd videos v2: ${JSON.stringify(body, null, 2)}`);
    const url = process.env.NEXT_PUBLIC_STABLE_DIFFUSSION_SERVER_VIDEO;
    const resp = await apiSdVideosPost(url, body);
    console.log(resp.data);
    return resp.data.url;
  } catch (error) {
    throw error;
  }
};
