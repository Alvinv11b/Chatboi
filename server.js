require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Knowledge Base
const knowledgeBase = `
1. How do I reset my password? You can reset your password by clicking "Forgot Password" on the login page.
2. How do I contact support? Email support@company.com or call 1-800-555-1234.
3. What are your business hours? We are open from 9 AM to 5 PM, Monday through Friday.
`;

// Chat endpoint
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: 'You are an assistant knowledgeable about the following topics:\n' + knowledgeBase },
                    { role: 'user', content: message },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const botMessage = response.data.choices[0].message.content;
        res.json({ reply: botMessage });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send({ error: 'Something went wrong with OpenAI API.' });
    }
});

// Start the server
const PORT = process.env.PORT || 5501;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});