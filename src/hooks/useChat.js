import { useState, useCallback } from 'react'
import useAppStore from '../store/useAppStore'
import { sendMessage } from '../services/geminiService'
import toast from 'react-hot-toast'

export function useChat() {
  const { chatHistory, addMessage } = useAppStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [typingText, setTypingText] = useState('')

  const simulateTyping = useCallback(async (text, onChunk) => {
    const words = text.split(' ')
    let current = ''
    for (let i = 0; i < words.length; i++) {
      current += (i === 0 ? '' : ' ') + words[i]
      onChunk(current)
      await new Promise((r) => setTimeout(r, 30 + Math.random() * 20))
    }
  }, [])

  const sendChatMessage = useCallback(
    async (userContent) => {
      if (!userContent.trim()) return
      setError(null)

      const userMessage = { role: 'user', content: userContent, timestamp: new Date().toISOString() }
      addMessage(userMessage)

      setIsLoading(true)
      setTypingText('')

      try {
        const allMessages = [...chatHistory, userMessage]
        const responseText = await sendMessage(allMessages)

        // Typing animation — word-by-word reveal
        await simulateTyping(responseText, (chunk) => {
          setTypingText(chunk)
        })

        const aiMessage = {
          role: 'assistant',
          content: responseText,
          timestamp: new Date().toISOString(),
        }
        addMessage(aiMessage)
        setTypingText('')
      } catch (err) {
        setError(err.message || 'Something went wrong. Please try again.')
        toast.error(err.message || 'Failed to get AI response')
      } finally {
        setIsLoading(false)
      }
    },
    [chatHistory, addMessage, simulateTyping]
  )

  return {
    messages: chatHistory,
    isLoading,
    error,
    typingText,
    sendChatMessage,
  }
}
