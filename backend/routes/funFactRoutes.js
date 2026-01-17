const express = require('express');
const { callGeminiAPI } = require('../utils/geminiHelper');
const router = express.Router();

router.get('/fun-fact', async (req, res) => {
    try {
        const prompt = 'Generate one interesting, unique, and fun fact about science, history, nature, or technology. Make it educational and surprising. Keep it to 2-3 sentences.';
        
        const fact = await callGeminiAPI(prompt);
        
        res.json({
            fact: fact,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error generating fun fact:', error);
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
});

router.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'Fun Facts API' });
});

module.exports = router;
