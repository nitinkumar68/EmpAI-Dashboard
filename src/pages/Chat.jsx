import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Trash2, Mic, MicOff, Sparkles, AlertCircle } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import MessageBubble, { TypingBubble } from '../components/chat/MessageBubble'
import SuggestedPrompts from '../components/chat/SuggestedPrompts'
import Button from '../components/ui/Button'
import { useChat } from '../hooks/useChat'
import { useVoiceInput } from '../hooks/useVoiceInput'
import useAppStore from '../store/useAppStore'
import styles from './Chat.module.css'

function EmptyChat() {
  return (
    <div className={styles.emptyState}>
      <motion.div
        className={styles.emptyIcon}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles size={32} color="#818CF8" />
      </motion.div>
      <h2 className={styles.emptyTitle}>Ask your AI Assistant</h2>
      <p className={styles.emptySubtitle}>
        I'm here to help with HR policies, employee queries, and anything about your organization.
      </p>
    </div>
  )
}

export default function Chat() {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const { messages, isLoading, error, typingText, sendChatMessage } = useChat()
  const { clearChat } = useAppStore()

  const { isListening, isSupported, toggleListening } = useVoiceInput((transcript) => {
    setInput(transcript)
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typingText])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    const msg = input
    setInput('')
    await sendChatMessage(msg)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <AppLayout>
      <div className={styles.chatPage}>
        {/* Chat container */}
        <div className={styles.chatContainer}>
          {/* Messages */}
          <div className={styles.messages}>
            {messages.length === 0 && <EmptyChat />}
            <AnimatePresence>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
            </AnimatePresence>
            {isLoading && <TypingBubble text={typingText} />}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested prompts (shown when empty) */}
          {messages.length === 0 && (
            <div className={styles.suggestedWrapper}>
              <SuggestedPrompts onSelect={(p) => {
                setInput(p)
                inputRef.current?.focus()
              }} />
            </div>
          )}

          {/* Error */}
          {error && (
            <motion.div
              className={styles.errorBar}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={14} />
              {error}
            </motion.div>
          )}

          {/* Input area */}
          <div className={styles.inputArea}>
            <div className={styles.inputRow}>
              {isSupported && (
                <motion.button
                  className={`${styles.iconBtn} ${isListening ? styles.listening : ''}`}
                  onClick={toggleListening}
                  whileTap={{ scale: 0.9 }}
                  aria-label={isListening ? 'Stop recording' : 'Voice input'}
                  id="voice-input-btn"
                >
                  {isListening
                    ? <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}><MicOff size={18} /></motion.div>
                    : <Mic size={18} />
                  }
                </motion.button>
              )}

              <textarea
                ref={inputRef}
                className={styles.textarea}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about HR policies, leave requests, benefits..."
                rows={1}
                id="chat-input"
                style={{ resize: 'none' }}
              />

              <motion.button
                className={`${styles.sendBtn} ${(!input.trim() || isLoading) ? styles.disabled : ''}`}
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                whileTap={{ scale: 0.9 }}
                id="send-message-btn"
              >
                <Send size={18} />
              </motion.button>
            </div>

            <div className={styles.inputFooter}>
              <span style={{ fontSize: 11, color: 'var(--fg-subtle)' }}>
                Press Enter to send · Shift+Enter for new line
              </span>
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Trash2 size={13} />}
                  onClick={clearChat}
                  id="clear-chat-btn"
                >
                  Clear chat
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
