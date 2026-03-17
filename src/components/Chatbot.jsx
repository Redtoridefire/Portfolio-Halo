import { useState, useRef, useEffect } from "react";
import { trackEvent } from "../utils/analytics";

const suggestedQuestions = [
  "What's Mike's experience with AI security?",
  "Tell me about his work at Capital One",
  "What certifications does he have?",
  "Does he do consulting work?",
  "What cloud platforms has he worked with?",
  "Can you draft a 30/60/90 day security roadmap?",
];

const quickActions = [
  { label: "Book Intro Call", href: "https://calendly.com/mikeczarnecki/new-meeting-1" },
  { label: "Email Mike", href: "mailto:mczarneckiitsearch@gmail.com" },
  { label: "View Use Cases", href: "/use-cases" },
  { label: "Download Advisory Brief", href: "/briefs/advisory-engagement-brief.md" },
];

const strategyActions = [
  {
    label: "Generate 30/60/90 Roadmap",
    prompt:
      "I need a practical 30/60/90 day cybersecurity roadmap for a mid-size company. Please keep it concise, outcomes-focused, and grouped by 30, 60, and 90 days.",
  },
  {
    label: "AI Governance Readiness Plan",
    prompt:
      "Can you outline a fast AI governance readiness plan with top controls, policy priorities, and stakeholder ownership for the next quarter?",
  },
  {
    label: "Board Risk Update Draft",
    prompt:
      "Draft a board-ready cyber risk update with key risk themes, KRIs, and executive recommendations in plain business language.",
  },
];

// Simple markdown-like formatter for chat messages
const formatMessage = (content) => {
  if (!content) return null;
  
  // Split by double newlines for paragraphs
  const paragraphs = content.split(/\n\n+/);
  
  return paragraphs.map((paragraph, pIndex) => {
    // Check if this paragraph is a list
    const lines = paragraph.split('\n');
    const isBulletList = lines.every(line => 
      line.trim() === '' || line.trim().match(/^[-•*]\s/)
    );
    const isNumberedList = lines.every(line => 
      line.trim() === '' || line.trim().match(/^\d+[\.\)]\s/)
    );
    
    if (isBulletList && lines.some(l => l.trim())) {
      return (
        <ul key={pIndex} className="chat-list">
          {lines
            .filter(line => line.trim())
            .map((line, lIndex) => (
              <li key={lIndex}>{formatInlineText(line.replace(/^[-•*]\s*/, ''))}</li>
            ))}
        </ul>
      );
    }
    
    if (isNumberedList && lines.some(l => l.trim())) {
      return (
        <ol key={pIndex} className="chat-list">
          {lines
            .filter(line => line.trim())
            .map((line, lIndex) => (
              <li key={lIndex}>{formatInlineText(line.replace(/^\d+[\.\)]\s*/, ''))}</li>
            ))}
        </ol>
      );
    }
    
    // Regular paragraph - handle single line breaks
    const formattedLines = lines.map((line, lIndex) => (
      <span key={lIndex}>
        {formatInlineText(line)}
        {lIndex < lines.length - 1 && <br />}
      </span>
    ));
    
    return <p key={pIndex} className="chat-paragraph">{formattedLines}</p>;
  });
};

// Format inline text (bold, links, etc.)
const formatInlineText = (text) => {
  if (!text) return text;
  
  // Handle bold text **text** or __text__
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
  
  return parts.map((part, index) => {
    if (part.match(/^\*\*[^*]+\*\*$/) || part.match(/^__[^_]+__$/)) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm here to answer questions about Michael Czarnecki's professional background and experience. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    trackEvent("chat_message_sent", { length: messageText.length });
    setInput("");
    setIsLoading(true);

    try {
      // Build conversation history (exclude the initial greeting for cleaner context)
      const conversationHistory = [...messages.slice(1), userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Call our secure serverless API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversationHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "API request failed");
      }

      if (data.content) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content },
        ]);
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (question) => {
    sendMessage(question);
  };

  const handleStrategyAction = (action) => {
    trackEvent("chat_strategy_action_click", { action: action.label });
    sendMessage(action.prompt);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className={`chatbot-toggle ${isOpen ? "open" : ""}`}
        onClick={() => {
          const nextOpenState = !isOpen;
          setIsOpen(nextOpenState);
          if (nextOpenState) trackEvent("chat_opened");
        }}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">MC</div>
            <div>
              <div className="chatbot-title">Ask About Mike</div>
              <div className="chatbot-subtitle">AI-Powered Assistant</div>
            </div>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chatbot-message ${msg.role}`}>
              {msg.role === "assistant" && <div className="message-avatar">MC</div>}
              <div className="message-content">
                {msg.role === "assistant" ? formatMessage(msg.content) : msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chatbot-message assistant">
              <div className="message-avatar">MC</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="chatbot-suggestions">
            <div className="suggestions-label">Try asking:</div>
            <div className="suggestions-list">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="suggestion-btn"
                  onClick={() => handleSuggestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="chatbot-quick-actions">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="chatbot-quick-action"
                target={action.href.startsWith("http") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => trackEvent("chat_quick_action_click", { action: action.label })}
              >
                {action.label}
              </a>
            ))}
          </div>
        )}

        {messages.length === 1 && (
          <div className="chatbot-strategy-actions">
            <div className="strategy-actions-title">Need something actionable?</div>
            <div className="strategy-actions-grid">
              {strategyActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="strategy-action-btn"
                  onClick={() => handleStrategyAction(action)}
                  disabled={isLoading}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <form className="chatbot-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Mike's experience..."
            className="chatbot-input"
            disabled={isLoading}
          />
          <button type="submit" className="chatbot-send" disabled={isLoading || !input.trim()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
