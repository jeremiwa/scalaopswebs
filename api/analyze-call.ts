import { GoogleGenAI, Type, Schema } from '@google/genai';
import { jsonrepair } from 'jsonrepair';

export const config = {
    maxDuration: 60,
};

const SYSTEM_PROMPT = `Sos un director comercial senior, sales coach de high ticket y analista experto en llamadas de ventas.

Tu tarea es analizar conversaciones comerciales para detectar:
- por qué una venta avanza o se cae
- dónde hay fugas de revenue
- qué errores comete el vendedor
- qué objeciones frenan la decisión
- qué debería hacerse distinto para aumentar la tasa de cierre

Reglas obligatorias:
- Respondé siempre en español.
- Escribí de forma ejecutiva, clara, concreta y accionable.
- No uses lenguaje robótico, genérico ni demasiado largo.
- No escribas párrafos innecesarios.
- No repitas información.
- No des consejos vagos.
- Priorizá el diagnóstico, la claridad y la utilidad práctica.
- Pensá como un coach comercial de élite y como un gerente de ventas que necesita decidir rápido.

El análisis debe enfocarse en:
- descubrimiento y profundidad del dolor
- claridad del deseo del lead
- autoridad y credibilidad del vendedor
- diferenciación de la oferta
- objeciones y cómo se manejaron
- urgencia y escasez
- cierre y control de la conversación
- próximo paso recomendado

Instrucciones de redacción:
- Cada bloque debe ser corto y fácil de escanear.
- El resumen ejecutivo debe tener exactamente 3 partes: situación, problema, impacto. Cada una de 1 oración máximo.
- Cada insight debe tener: tipo (critical/warning/opportunity), título corto (máximo 5 palabras), descripción breve (1 oración).
- La recomendación de IA debe incluir: una sola frase sugerida que el vendedor debería haber dicho, y una explicación breve de por qué funciona (1 oración).
- Las mejoras deben venir con título corto (máximo 4 palabras) y descripción breve (1 oración).
- La próxima mejor acción debe ser concreta: una acción y un objetivo, ambos en 1 oración.
- Si falta información, devolvé la mejor inferencia posible sin inventar hechos.
- No agregues introducciones ni conclusiones fuera del formato solicitado.

Debes responder ÚNICAMENTE con un objeto JSON válido que cumpla con la estructura solicitada.`;

const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        closing_probability: { type: Type.INTEGER, description: "Probabilidad de cierre estimada entre 0 y 100." },
        risk_level: { type: Type.STRING, description: "Nivel de riesgo: 'Crítico', 'Alto', 'Moderado' o 'Bajo'." },
        main_objection: { type: Type.STRING, description: "Objeción principal detectada. 'Ninguna' si no hubo." },
        talk_listen_ratio: { type: Type.STRING, description: "Ratio habla/escucha del vendedor (ej. '60/40')." },
        overall_score: { type: Type.INTEGER, description: "Score general del 0 al 100." },
        executive_summary: {
            type: Type.OBJECT,
            properties: {
                situation: { type: Type.STRING, description: "Situación de la llamada en 1 oración." },
                problem: { type: Type.STRING, description: "Problema principal detectado en 1 oración." },
                impact: { type: Type.STRING, description: "Impacto comercial en 1 oración." }
            },
            required: ["situation", "problem", "impact"]
        },
        key_insights: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    type: { type: Type.STRING, description: "Tipo: 'critical', 'warning' o 'opportunity'." },
                    title: { type: Type.STRING, description: "Título corto del insight (máximo 5 palabras)." },
                    description: { type: Type.STRING, description: "Descripción breve en 1 oración." }
                },
                required: ["type", "title", "description"]
            },
            description: "Exactamente 3 insights: uno critical, uno warning, uno opportunity."
        },
        ai_recommendation: {
            type: Type.OBJECT,
            properties: {
                suggested_phrase: { type: Type.STRING, description: "Frase sugerida que el vendedor debería haber dicho." },
                why_it_works: { type: Type.STRING, description: "Por qué esta frase funciona, en 1 oración." }
            },
            required: ["suggested_phrase", "why_it_works"]
        },
        top_improvements: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "Título corto de la mejora (máximo 4 palabras)." },
                    description: { type: Type.STRING, description: "Descripción en 1 oración." }
                },
                required: ["title", "description"]
            },
            description: "Exactamente 5 mejoras prioritarias."
        },
        next_best_action: {
            type: Type.OBJECT,
            properties: {
                action: { type: Type.STRING, description: "Acción concreta a tomar, en 1 oración." },
                goal: { type: Type.STRING, description: "Objetivo de esa acción, en 1 oración." }
            },
            required: ["action", "goal"]
        },
        category_scores: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Nombre de la categoría en español." },
                    score: { type: Type.INTEGER, description: "Score del 0 al 100." }
                },
                required: ["name", "score"]
            },
            description: "Exactamente 8 categorías: Autoridad, Claridad, Cierre, Descubrimiento, Seguimiento, Objeciones, Rapport, Urgencia."
        }
    },
    required: ["closing_probability", "risk_level", "main_objection", "talk_listen_ratio", "overall_score", "executive_summary", "key_insights", "ai_recommendation", "top_improvements", "next_best_action", "category_scores"]
};

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { transcript, downloadUrl, playbookContext } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in environment.' });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        let contentObj: any = transcript;

        if (downloadUrl && !transcript) {
            const audioRes = await fetch(downloadUrl);
            const arrayBuffer = await audioRes.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            contentObj = {
                inlineData: {
                    mimeType: audioRes.headers.get('content-type') || 'audio/mp3',
                    data: buffer.toString("base64")
                }
            };
        }

        if (!contentObj) {
            return res.status(400).json({ error: 'Must provide either transcript or downloadUrl' });
        }

        // Build dynamically injected System Prompt
        let finalSystemPrompt = SYSTEM_PROMPT;
        if (playbookContext) {
            try {
                // Parse it just to format it nicely if it's JSON, or use it directly
                const pb = JSON.parse(playbookContext);
                finalSystemPrompt += `

--- CONTEXTO ESPECÍFICO DE LA EMPRESA (PLAYBOOK COMERCIAL) ---
Usa rigurosamente esta información sobre el negocio al evaluar la llamada:
${Object.entries(pb).map(([k, v]) => `- ${k.toUpperCase()}: ${typeof v === 'object' ? JSON.stringify(v) : v}`).join('\n')}
--------------------------------------------------------------`;
            } catch (e) {
                console.warn("Could not parse playbookContext. Injecting as raw string.");
                finalSystemPrompt += `\n\n--- CONTEXTO ESPECÍFICO DE LA EMPRESA ---\n${playbookContext}`;
            }
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: "Analizá esta llamada comercial siguiendo las instrucciones del sistema. Devolvé únicamente el JSON estructurado." },
                        typeof contentObj === 'string' ? { text: contentObj } : contentObj
                    ]
                }
            ],
            config: {
                systemInstruction: finalSystemPrompt,
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.15,
            }
        });

        const rawText = response.text || "{}";
        let parsedJson;

        try {
            parsedJson = JSON.parse(rawText);
        } catch (e) {
            parsedJson = JSON.parse(jsonrepair(rawText));
        }

        return res.status(200).json({ success: true, analysis: parsedJson });
    } catch (error: any) {
        console.error('❌ Error analyzing call:', error);
        return res.status(500).json({ error: error.message });
    }
}
