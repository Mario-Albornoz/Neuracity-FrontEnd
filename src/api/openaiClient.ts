import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: "sk-2db857754283424a95f86fb87f53b1d9",
  dangerouslyAllowBrowser: true,
});

export default openai;