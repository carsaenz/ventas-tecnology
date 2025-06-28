import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { messages, language, suggestions } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'No OpenAI API key' });

  const systemPrompt = `Eres un chatbot experto en ecommerce. Responde en el idioma del usuario (${language}). Si el usuario pide sugerencias, usa este contexto: ${suggestions}. Sé breve, útil y profesional.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI error:', data);
      return res.status(500).json({ error: 'OpenAI error', details: data });
    }
    if (data.choices && data.choices[0]) {
      res.status(200).json({ text: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'No response from OpenAI', details: data });
    }
  } catch (e) {
    console.error('Server error:', e);
    res.status(500).json({ error: 'Server error', details: e instanceof Error ? e.message : e });
  }
}
