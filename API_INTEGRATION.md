# 🔌 Gemini AI API Integration Guide

This document details the architecture, design decisions, and configuration of the Google Gemini AI integration in **EmpAI Assistant Dashboard**.

---

## 📑 Table of Contents

1. [Overview](#overview)
2. [Architecture & Flow](#architecture--flow)
3. [Gemini Model Strategy](#gemini-model-strategy)
4. [Service Implementation](#service-implementation)
5. [System Prompt Engineering](#system-prompt-engineering)
6. [Environment Variable Configuration](#environment-variable-configuration)
7. [Error Handling & Fallbacks](#error-handling--fallbacks)
8. [Security & Best Practices](#security--best-practices)

---

## 🤖 Overview

The AI Chat component in EmpAI serves as an interactive employee assistant capable of answering questions regarding HR policies, leave structure, performance reviews, benefits, and workplace guidelines. 

The integration relies on **Google's official `@google/generative-ai` SDK** utilizing **Gemini 3.6 Flash**.

---

## 🏗️ Architecture & Flow

```
┌─────────────────┐       ┌────────────────────┐       ┌────────────────────────┐       ┌─────────────────────────┐
│ User UI Input   │ ────> │ Zustand Store      │ ────> │ geminiService.js       │ ────> │ Google Generative AI    │
│ (Chat.jsx)      │       │ (Chat State)       │       │ (sendMessage)          │       │ API (gemini-3.6-flash)  │
└─────────────────┘       └────────────────────┘       └────────────────────────┘       └─────────────────────────┘
                                                                                                     │
┌─────────────────┐                                                                                  │
│ User Screen     │ <────────────────────────────────────────────────────────────────────────────────┘
│ Stream Response │
└─────────────────┘
```

1. **User Action**: The user selects a suggested prompt or types a question into `Chat.jsx`.
2. **State Dispatch**: The message is added to the Zustand chat state store (`useAppStore.js`) immediately to display user intent.
3. **Service Layer Execution**: `sendMessage(messages)` in `src/services/geminiService.js` is invoked.
4. **Environment Authentication**: Read `import.meta.env.VITE_GEMINI_API_KEY`.
5. **Chat Session Initialization**: Instantiates `genAI.getGenerativeModel()` with model `gemini-3.6-flash` and injects system instructions via chat history.
6. **Response Handling**: The generated Markdown response is returned and rendered in the UI with typing indicator feedback.

---

## 🎯 Gemini Model Strategy

Google Generative AI periodically updates model availability and endpoints. 

- **Primary Model**: `gemini-3.6-flash`
  - Offers ultra-fast response times, low latency, and reasoning capability ideal for interactive conversational agents.
- **Automated Multi-Model Fallback**:
  - In `src/services/geminiService.js`, the service iterates through fallback models if a particular endpoint undergoes deprecation or region lock:
    1. `gemini-3.6-flash` (Primary)
    2. `gemini-2.5-flash` (Secondary Fallback)
    3. `gemini-1.5-flash` (Tertiary Fallback)

---

## 💻 Service Implementation

Here is the implementation pattern used in `src/services/geminiService.js`:

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai'

const SYSTEM_PROMPT = `You are EmpAI Assistant, an intelligent HR and employee management AI for a modern company called EmpAI...`

const ENV_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export async function sendMessage(messages) {
  const apiKey = ENV_API_KEY

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your environment.')
  }

  const { GoogleGenerativeAI } = await import('@google/generative-ai')
  const genAI = new GoogleGenerativeAI(apiKey)

  const models = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-1.5-flash']
  let lastError = null

  // Transform chat history for the SDK
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
```

---

## 📝 System Prompt Engineering

The assistant's persona is defined via `SYSTEM_PROMPT` to constrain responses to enterprise HR domains:

```text
You are EmpAI Assistant, an intelligent HR and employee management AI for a modern company called EmpAI. 
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
Keep responses focused and actionable.
```

---

## 🔑 Environment Variable Configuration

### Local Development (`.env`)
Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Production Deployment (Vercel / Netlify)
Set the environment variable in your deployment platform's settings:
- **Variable Name**: `VITE_GEMINI_API_KEY`
- **Variable Value**: `<your-api-key>`

> ⚠️ Note: Vite requires environment variables exposed to client-side code to start with the `VITE_` prefix.

---

## 🛡️ Security & Best Practices

1. **Git Protection**: `.env` is explicitly included in `.gitignore` to prevent leaking secret keys to GitHub.
2. **User Abstraction**: The API key is configured globally via environment variables. End users visiting the website do not need to enter or manage their own keys.
3. **Sanitized Input**: User messages are passed safely as text parts to prevent prompt injection issues.
4. **Graceful UI Feedback**: When network issues or invalid API keys occur, `Chat.jsx` catches exceptions and presents clear error banners to the user.
