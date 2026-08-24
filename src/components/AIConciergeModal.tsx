import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  Loader2, 
  HelpCircle, 
  MessageSquare, 
  Phone,
  ShieldCheck
} from 'lucide-react';
import { ConciergeMessage } from '../types';

interface AIConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIConciergeModal: React.FC<AIConciergeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<ConciergeMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Merhaba! I am Aylin, your Senior Private Travel Concierge at Signature Turkey Tours. Whether you are curious about the best cave hotels in Cappadocia, dress codes for Hagia Sophia, balloon refund guarantees, or tailoring a private itinerary, I am delighted to assist you.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    'How do the 3 hotel tiers (Classic, Comfort, Luxury) differ?',
    'What happens if Cappadocia balloons cancel due to weather?',
    'What is the dress code for visiting mosques in Istanbul?',
    'Can you recommend a 10-day itinerary for a couple?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery.trim();
    if (!query || loading) return;

    const userMsg: ConciergeMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      // Build conversation history for context
      const chatHistory = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const res = await fetch('/api/ai/ask-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          conversationHistory: chatHistory,
        }),
      });

      const data = await res.json();
      if (data.success && data.answer) {
        const assistantMsg: ConciergeMessage = {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: data.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const errMsg: ConciergeMessage = {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: 'I apologize, but I encountered a momentary connection glitch. Please feel free to message our live concierge team directly on WhatsApp (+90 544 836 28 45).',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errMsg]);
      }
    } catch (err: any) {
      console.error(err);
      const errMsg: ConciergeMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: 'I apologize, but I encountered a momentary connection glitch. Please feel free to message our live concierge team directly on WhatsApp (+90 544 836 28 45).',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div className="bg-white dark:bg-stone-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col h-[620px] max-h-[92vh] overflow-hidden text-stone-900 dark:text-stone-100">
        {/* Modal Header */}
        <div className="bg-white dark:bg-stone-950 p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-bold text-base shadow-md border border-amber-300">
                ✦
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-stone-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-stone-900 dark:text-white font-serif-luxury">Aylin &bull; AI Travel Concierge</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  Signature AI
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Senior Private Travel Specialist &bull; TÜRSAB Licensed Guide Knowledge
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-700 text-stone-500 dark:text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-stone-950/40">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                    isUser
                      ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-none'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700/80 rounded-tl-none'
                  }`}
                >
                  <p>{m.text}</p>
                  <div className={`text-[9px] mt-1.5 ${isUser ? 'text-stone-800' : 'text-stone-500 dark:text-stone-400'} text-right`}>
                    {m.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-2.5 items-center text-stone-500 dark:text-stone-400 text-xs">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-stone-100 dark:bg-stone-800 px-3.5 py-2.5 rounded-2xl rounded-tl-none border border-stone-300 dark:border-stone-700/80 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600 dark:text-amber-400" />
                <span>Aylin is typing advice...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 overflow-x-auto flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 shrink-0">Ask:</span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(q)}
              className="text-[11px] bg-stone-100 dark:bg-stone-800 hover:bg-stone-700 text-stone-600 dark:text-stone-300 px-2.5 py-1 rounded-md border border-stone-300 dark:border-stone-700 shrink-0 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask Aylin anything about Turkey travel, tours, hotels, or food..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400"
          />

          <button
            type="button"
            id="send-concierge-msg-btn"
            disabled={loading || !inputQuery.trim()}
            onClick={() => handleSendMessage()}
            className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-all disabled:opacity-40 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
