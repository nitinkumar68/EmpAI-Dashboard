/**
 * Gemini AI Service
 * API key is read from environment variable VITE_GEMINI_API_KEY
 * Users do not need to provide their own key.
 */

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

// Read API key from environment — set in .env file or Vercel env vars
const ENV_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY

export async function sendMessage(messages) {
  // First, try serverless endpoint /api/chat (keeps API key completely hidden on Vercel backend)
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    })

    if (res.ok) {
      const data = await res.json()
      if (data.text) return data.text
      if (data.error) throw new Error(data.error)
    } else {
      const errorData = await res.json().catch(() => ({}))
      if (errorData.error && !errorData.error.includes('404')) {
        throw new Error(errorData.error)
      }
    }
  } catch (err) {
    // If error is from Vercel API function directly, rethrow it unless it's local dev 404 fallback
    if (err.message && !err.message.includes('Failed to fetch') && !err.message.includes('404')) {
      console.warn('Serverless API call warning:', err.message)
    }
  }

  // Fallback for local development or direct client calls
  const apiKey = ENV_API_KEY

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key is not configured. Please set GEMINI_API_KEY in your Vercel environment variables.')
  }

  const { GoogleGenerativeAI } = await import('@google/generative-ai')
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
      return response.text()
    } catch (err) {
      console.warn(`Gemini model ${modelName} failed:`, err)
      lastError = err
    }
  }

  throw lastError || new Error('Failed to generate response from Gemini AI.')
}

export const suggestedPrompts = [
  '📋 What is the leave policy for new employees?',
  '🎯 How do I set up a performance review?',
  '🏥 What health benefits do we offer?',
  '📈 How to request a promotion?',
  '🤝 What is the onboarding process?',
  '💰 Explain the compensation structure',
  '🏠 What is the remote work policy?',
  '📚 What learning resources are available?',
]
