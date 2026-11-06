const express = require('express');
const app = express();

app.use(express.json());

// 1. Endpoint para Resúmenes de Archivos (Usa API Key 1)
app.post('/api/summarize', async (req, res) => {
  const { text } = req.body;
  const apiKey = process.env.AL_X_API_KEY_1;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Actúa como el sistema AL-X. Haz un resumen educativo estructurado de esto: ${text}` }] }]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Endpoint para el Chatbot Educativo (Usa API Key 2)
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.AL_X_API_KEY_2;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Eres el asistente de AL-X. Responde basándote estrictamente en las lecciones guardadas: ${prompt}` }] }]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Endpoint para Generar Quizzes y Preguntas (Usa API Key 3)
app.post('/api/quiz', async (req, res) => {
  const { topic } = req.body;
  const apiKey = process.env.AL_X_API_KEY_3;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Genera 5 preguntas tipo quiz con sus respuestas correctas sobre el tema: ${topic}` }] }]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
