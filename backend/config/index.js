require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
};
