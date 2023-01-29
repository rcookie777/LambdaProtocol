/* eslint-disable no-useless-concat */
/* eslint-disable no-template-curly-in-string */
const axios = require('axios');

const openai_api_key = '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'

async function CheckMessage(message) {
  
  const prompt = "You are a moderator for a discussion board, is the following message neither harmul or offensive:" + "'"+ message +"'" + "Respond yes or no";
  // console.log(prompt);
  try {
    // Make the API call
    const response = await axios.post("https://api.openai.com/v1/engines/text-davinci-003/completions", {
      prompt: prompt,
      max_tokens: 7,
      temperature: 0.1,
    },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + openai_api_key
  }
  });
  // Extract the generated text from the API response
  const generatedText = response.data.choices[0].text;
  console.log(generatedText);
  if (generatedText.toLowerCase().includes("yes")) {
    console.log(true);
    return true;
  } else if (generatedText.toLowerCase().includes("no")) {
    console.log(false);
    return false;
  }
    } catch (error) {
    console.log(error);
  }
}


export default CheckMessage;