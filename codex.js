const axios = require('axios');
require('dotenv').config({ path: 'secure.env' });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function getCodeSuggestion(prompt) {
    const headers = {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
    };
    const data = {
        'prompt': prompt,
        'max_tokens': 100
    };
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', data, { headers: headers });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error("Error fetching code suggestion:", error);
        return null;
    }
}

(async () => {
    const prompt = process.argv[2];
    if (!prompt) {
        console.log("Please provide a code-related query as an argument.");
        return;
    }
    const suggestion = await getCodeSuggestion(prompt);
    console.log("Suggested Code:\n", suggestion);
})();