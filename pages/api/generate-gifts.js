import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { price_min, price_max, gender, age, hobbies } = req.body;
  const prompt = generatePrompt(price_min, price_max, gender, age, hobbies);

  console.log(prompt);

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(price_min, price_max, gender, age, hobbies) {
  return 'suggest 3 Christmas gift ideas between '+price_min+'$ and '+price_max+'$ for a '+age+' years old '+gender+' that is into '+hobbies;
}
