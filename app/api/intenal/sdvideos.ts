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
  clipId: string;
  prompts: string[];
  width: number;
  height: number;
  num_interpolation_steps?: number;
  fps?: number;
}

export const sdTxt2Video = async (req: RequestProps): Promise<string> => {
  try {
    const body = {
      ...req,
      clipId: req.clipId,
      seed: Math.floor(Math.random() * 9999),
      num_interpolation_steps: req.num_interpolation_steps || req.prompts.length || 1,
      fps: req.fps || 10
    };

    const url = process.env.NEXT_PUBLIC_STABLE_DIFFUSSION_SERVER_VIDEO;
    console.log(`api call to ${url}: ${JSON.stringify(body, null, 2)}`);
    console.log(url);
    const resp = await apiSdVideosPost(url, body);
    console.log(resp);
    // return resp.data.url;
    return '';
  } catch (error) {
    throw error;
  }
};
