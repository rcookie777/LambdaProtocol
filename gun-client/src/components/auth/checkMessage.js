const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = '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'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const CheckMessage = async (message) => {
    const prompt = `Answer only yes or no. Is this a harmful message? ${message}`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 7,
      temperature: 0,
    });
    const responseText = response.choices[0].text;
    if (responseText.toLowerCase() === 'yes') {
      return true;
    } else if (responseText.toLowerCase() === 'no') {
      return false;
    } else {
      console.log('Invalid response');
    }
};

module.exports = CheckMessage;

