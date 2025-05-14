import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpful AI assistant specialized in finance and business registration services. 
You should only provide information and assistance related to:
- Business registration and incorporation
- Financial services and products
- Tax-related queries
- Business compliance and regulations
- Financial planning and advice
- Business documentation and requirements

If asked about topics outside these areas, politely inform the user that you can only assist with finance and business-related queries.`;

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: message }
            ],
            model: "gpt-3.5-turbo",
            temperature: 0.7,
            max_tokens: 500,
        });

        return NextResponse.json({
            message: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to process your request' },
            { status: 500 }
        );
    }
} 