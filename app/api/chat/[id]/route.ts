export const runtime = 'nodejs'

import { getAgent } from '@/lib/agents'
import { validateChatMessages } from '@/lib/validation'
import OpenAI from 'openai'

// Route through the OpenClaw gateway — no separate API key needed
const openai = new OpenAI({
  baseURL: 'http://localhost:18789/v1',
  apiKey: process.env.OPENCLAW_GATEWAY_TOKEN,
})

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const agent = await getAgent(id)

  if (!agent) {
    return new Response(JSON.stringify({ error: 'Agent not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON in request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const result = validateChatMessages(body)
  if (!result.ok) {
    return new Response(
      JSON.stringify({ error: result.error }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const { messages } = result

  const systemPrompt = agent.soul
    ? `${agent.soul}\n\nYou are speaking directly with John, your operator. Stay fully in character. Be concise — this is a live chat. 2-4 sentences unless detail is asked for. No em dashes.`
    : `You are ${agent.name}, ${agent.title}. Respond in character. Be concise. No em dashes.`

  try {
    const stream = await openai.chat.completions.create({
      model: 'claude-sonnet-4-6',
      stream: true,
      messages: [
        { role: 'system' as const, content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content })),
      ] as OpenAI.ChatCompletionMessageParam[],
    })

    const body = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ''
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
              )
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        } catch (err) {
          console.error('Stream error:', err)
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        } finally {
          controller.close()
        }
      },
    })

    return new Response(body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (err) {
    console.error('Chat API error:', err)
    return new Response(
      JSON.stringify({ error: 'Chat failed. Make sure OpenClaw gateway is running.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
