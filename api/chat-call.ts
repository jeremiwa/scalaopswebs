import { GoogleGenAI } from '@google/genai';

export const config = {
    maxDuration: 60,
};

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, previousAnalysis, transcript, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const systemInstruction = `Actúa como un Coach de Ventas de Élite interactuando con el usuario sobre una llamada comercial específica.
Tu objetivo es responder a las preguntas del usuario basándote EXCLUSIVAMENTE en el contexto de la llamada provisto.

📋 METADATA Y ANÁLISIS PREVIO DE LA LLAMADA:
${JSON.stringify(previousAnalysis || {}, null, 2)}

🗣️ TRANSCRIPCIÓN (COMPLETA O PARCIAL):
${transcript ? transcript.substring(0, 5000) + (transcript.length > 5000 ? '\n...[TRUNCADA]' : '') : 'No disponible.'}

REGLAS:
1. Responde de forma directa, brutalmente útil y estructurada.
2. Si el usuario te pregunta por algo que no está en la llamada, indícale amablemente que no tienes esa información y que solo puedes hablar de la llamada actual.
3. Propón ejemplos literales ("Deberías haber dicho X en lugar de Y").
4. Sé un verdadero mentor comercial B2B High-Ticket.`;

        // Format history for Gemini API
        const formattedHistory = (history || []).map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        // Append the new message
        formattedHistory.push({
            role: 'user',
            parts: [{ text: message }]
        });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: formattedHistory,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.5,
            }
        });

        const reply = response.text;

        return res.status(200).json({ success: true, reply });
    } catch (error: any) {
        console.error('❌ Error in chat handler:', error);
        return res.status(500).json({ error: error.message });
    }
}
