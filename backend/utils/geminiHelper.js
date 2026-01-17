const fetch = require('node-fetch');
const config = require('../config');

async function callGeminiAPI(prompt) {
    try {
        const response = await fetch(`${config.API_URL}?key=${config.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('No response from API');
        }
    } catch (error) {
        throw new Error(`Failed to call Gemini API: ${error.message}`);
    }
}

module.exports = { callGeminiAPI };
