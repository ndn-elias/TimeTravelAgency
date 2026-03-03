import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Clé et endpoint Mistral ─────────────────────────────── */
const MISTRAL_API_KEY = '1Ji8bGGPNSQONarvcpo2Da1V7sJkecS5';
const MISTRAL_MODEL   = 'mistral-small-latest';

const SYSTEM_PROMPT = `Tu es CHRONOS, l'assistant virtuel de la TimeTravel Agency, une agence de voyage temporel basée en 2037.
Ton rôle : conseiller les clients sur nos trois destinations phares —
  • Rome Impériale (44 av. J.-C.) à 12 900 €, 7 jours, risque modéré
  • Paris Belle Époque (1889) à 9 700 €, 5 jours, risque faible
  • Tokyo Néo-Future (2157) à 18 500 €, 10 jours, risque élevé
Réponds toujours en français, avec élégance et un léger mystère temporel.
Sois bref (2-4 phrases max), précis, et encourage subtilement la réservation.
N'invente pas d'autres destinations ou prix. Si on te parle d'autre chose, redirige vers les voyages temporels.`;

/* ── Appel API Mistral ───────────────────────────────────── */
async function askMistral(history) {
  const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model: MISTRAL_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history,
      ],
      max_tokens: 200,
      temperature: 0.7,
    }),
  });

  if (!res.ok) throw new Error(`Mistral API error ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

/* ── Bulle de message ────────────────────────────────────── */
function MessageBubble({ msg }) {
  const isBot = msg.role === 'assistant';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center mr-2 flex-shrink-0 text-xs mt-0.5">
          ⏳
        </div>
      )}
      <div
        className={`max-w-[78%] px-4 py-2.5 rounded-2xl font-sans text-sm leading-relaxed ${
          isBot
            ? 'bg-cosmos-800 border border-gold/15 text-cream/80 rounded-tl-sm'
            : 'bg-gold text-cosmos-900 font-medium rounded-tr-sm'
        }`}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

/* ── Indicateur de frappe ────────────────────────────────── */
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2 mb-3"
    >
      <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-xs">
        ⏳
      </div>
      <div className="px-4 py-3 bg-cosmos-800 border border-gold/15 rounded-2xl rounded-tl-sm flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gold/60"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Chatbot principal ───────────────────────────────────── */
export default function Chatbot() {
  const [open, setOpen]   = useState(false);
  /* history = tableau de { role: 'user'|'assistant', content: string } */
  const [history, setHistory] = useState([
    {
      role: 'assistant',
      content: "Bienvenue ! Je suis CHRONOS, votre assistant temporel. Quelle époque vous attire — Rome Antique, Paris 1889 ou Tokyo 2157 ? ✨",
    },
  ]);
  const [input, setInput]   = useState('');
  const [typing, setTyping] = useState(false);
  const [error, setError]   = useState(null);
  const bottomRef           = useRef(null);
  const inputRef            = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || typing) return;

    const userMsg = { role: 'user', content: text };
    const nextHistory = [...history, userMsg];

    setHistory(nextHistory);
    setInput('');
    setTyping(true);
    setError(null);

    try {
      const reply = await askMistral(nextHistory);
      setHistory((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError("Le continuum est instable. Réessayez dans un instant.");
    } finally {
      setTyping(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const SUGGESTIONS = ['Destinations disponibles', 'Quel est le prix ?', 'Tokyo 2157'];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* ── Fenêtre chatbot ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="w-[340px] sm:w-[380px] h-[500px] glass border border-gold/20 rounded-2xl shadow-card overflow-hidden flex flex-col"
            style={{ transformOrigin: 'bottom right' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gold/15 bg-cosmos-900/70 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center text-base">
                    ⏳
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-cosmos-900" />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-cream tracking-wide">CHRONOS</div>
                  <div className="font-sans text-[10px] text-cream/40 tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Propulsé par Mistral AI
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-cream/30 hover:text-cream/70 transition-colors text-xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
              {history.map((msg, i) => (
                <MessageBubble key={i} msg={msg} />
              ))}
              <AnimatePresence>{typing && <TypingIndicator />}</AnimatePresence>

              {/* Message d'erreur */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center font-sans text-xs text-red-400/70 mt-2 mb-1 px-4"
                >
                  ⚠ {error}
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions rapides */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto flex-shrink-0 border-t border-gold/10">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  disabled={typing}
                  className="flex-shrink-0 px-3 py-1 border border-gold/25 text-gold/60 hover:border-gold/60 hover:text-gold disabled:opacity-40 font-sans text-[11px] rounded-full transition-all duration-200 whitespace-nowrap"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 flex-shrink-0">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Posez votre question..."
                  rows={1}
                  disabled={typing}
                  className="flex-1 bg-cosmos-900/80 border border-gold/20 text-cream/80 placeholder-cream/25 font-sans text-sm px-4 py-2.5 rounded-xl resize-none focus:outline-none focus:border-gold/50 transition-colors disabled:opacity-50"
                />
                <motion.button
                  onClick={() => sendMessage()}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  disabled={!input.trim() || typing}
                  className="w-10 h-10 rounded-xl bg-gold text-cosmos-900 flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-opacity"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bouton flottant ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="relative w-16 h-16 rounded-full bg-gold shadow-gold flex items-center justify-center text-cosmos-900 text-2xl"
        aria-label="Ouvrir le chatbot"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" style={{ animationDuration: '2s' }} />
        <span className="absolute inset-[-6px] rounded-full border border-gold/30 animate-ping" style={{ animationDuration: '2.8s', animationDelay: '0.4s' }} />

        {/* Icône */}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-lg font-bold leading-none relative z-10"
            >
              ×
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative z-10"
            >
              ⏳
            </motion.span>
          )}
        </AnimatePresence>

        {/* Badge non-lu */}
        {!open && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center z-10"
          >
            <span className="font-sans text-[10px] text-white font-bold">1</span>
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
