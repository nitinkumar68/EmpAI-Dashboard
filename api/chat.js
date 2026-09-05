import { GoogleGenerativeAI } from '@google/generative-ai'

const SYSTEM_PROMPT = `You are EmpAI Assistant, an intelligent HR and employee management AI for a modern company called EmpAI. 
You help employees and managers with:
- HR policies and procedures
- Employee onboarding and offboarding
- Performance management and reviews
- Leave and attendance policies
- Benefits and compensation queries
- Team collaboration and communication
- Career development and growth paths
- Workplace wellness and culture

Be professional, concise, empathetic, and helpful. Format responses with clear structure when listing items.
Use markdown formatting when appropriate (bold for emphasis, bullet points for lists).
Keep responses focused and actionable.`

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    return res.status(500).json({
      error: 'Gemini API key is not configured on the server. Please set GEMINI_API_KEY in Vercel environment variables.'
    })
  }

  try {
    const { messages } = req.body || {}

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid or missing messages array' })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const models = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-1.5-flash']
    let lastError = null

    // Build chat history for context (exclude last user message)
    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }))

    const lastMessage = messages[messages.length - 1]

    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName })
        const chat = model.startChat({
          history: [
            { role: 'user', parts: [{ text: 'Hello, who are you?' }] },
            { role: 'model', parts: [{ text: SYSTEM_PROMPT }] },
            ...history,
          ],
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7,
          },
        })

        const result = await chat.sendMessage(lastMessage.content)
        const response = await result.response
        const text = response.text()
        return res.status(200).json({ text })
      } catch (err) {
        console.warn(`Vercel function Gemini model ${modelName} failed:`, err)
        lastError = err
      }
    }

    return res.status(500).json({ error: lastError?.message || 'Failed to generate response from Gemini AI' })
  } catch (error) {
    console.error('API Chat Error:', error)
    return res.status(500).json({ error: error.message || 'Internal Server Error' })
  }
}
