import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from './SoundEngine';
import { trackEvent } from '../utils/analytics';
import './ironman.css';

const JARVIS_GREETING = "Good day. I'm J.A.R.V.I.S. — your interface to Mr. Czarnecki's portfolio. How may I assist you?";

const SUGGESTIONS = [
  "What does Mike specialize in?",
  "Tell me about AI security work",
  "What's his experience at AmEx?",
  "Can he help my startup?",
  "What certifications does he hold?",
];

function formatMessage(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>');
}

export default function JarvisChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: JARVIS_GREETING, id: 0 },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [msgIdCounter, setMsgIdCounter] = useState(1);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, messages, scrollToBottom]);

  const sendMessage = useCallback(async (text) => {
    const content = text.trim();
    if (!content || loading) return;

    soundEngine.playClick();
    trackEvent('jarvis_message', { text: content.substring(0, 50) });

    const userMsg = { role: 'user', content, id: msgIdCounter };
    setMsgIdCounter((c) => c + 1);
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Build messages array in the format the API expects: [{role, content}, ...]
      const history = [...messages, userMsg]
        .slice(-8)
        .map(({ role, content }) => ({ role, content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();

      if (res.ok) {
        // API returns { content: "..." }
        const reply = data.content || data.message || data.reply || data.response;
        soundEngine.playDataStream();
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: reply, id: msgIdCounter + 1 },
        ]);
        setMsgIdCounter((c) => c + 2);
      } else {
        // Surface the actual API error message if there is one
        throw new Error(data.error || 'API error');
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm having trouble reaching the server. Please try contacting Mr. Czarnecki directly via the COMMS panel.",
          id: msgIdCounter + 1,
        },
      ]);
      setMsgIdCounter((c) => c + 2);
    } finally {
      setLoading(false);
    }
  }, [loading, messages, msgIdCounter]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleToggle = () => {
    if (!open) {
      soundEngine.playJarvisActivate();
    } else {
      soundEngine.playPanelClose();
    }
    setOpen((o) => !o);
  };

  return (
    <div className="jarvis-chat-trigger">
      {/* JARVIS chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="jarvis-chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            {/* Header */}
            <div className="jarvis-chat-header">
              <div className="jarvis-chat-title">
                <div className="hud-status-dot" />
                J.A.R.V.I.S. NEURAL LINK
              </div>
              <button className="jarvis-chat-close" onClick={handleToggle}>×</button>
            </div>

            {/* Messages */}
            <div className="jarvis-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`jarvis-message ${msg.role}`}>
                  <div className="jarvis-message-label">
                    {msg.role === 'assistant' ? 'J.A.R.V.I.S.' : 'OPERATIVE'}
                  </div>
                  <div
                    className="jarvis-bubble"
                    dangerouslySetInnerHTML={{
                      __html: `<p>${formatMessage(msg.content)}</p>`,
                    }}
                  />
                </div>
              ))}

              {loading && (
                <div className="jarvis-message">
                  <div className="jarvis-message-label">J.A.R.V.I.S.</div>
                  <div className="jarvis-bubble">
                    <div className="jarvis-typing">
                      <div className="jarvis-typing-dot" />
                      <div className="jarvis-typing-dot" />
                      <div className="jarvis-typing-dot" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="jarvis-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    className="jarvis-suggestion-btn"
                    onClick={() => sendMessage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="jarvis-input-area">
              <input
                ref={inputRef}
                className="jarvis-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Query J.A.R.V.I.S..."
                disabled={loading}
              />
              <button
                className="jarvis-send-btn"
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
              >
                SEND
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        className="jarvis-chat-btn"
        onClick={handleToggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        title="Open J.A.R.V.I.S."
      >
        {open ? '×' : 'AI'}
      </motion.button>
    </div>
  );
}
