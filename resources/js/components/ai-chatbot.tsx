import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, X, Send, ChevronDown } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

const faqDatabase = [
  {
    keywords: ['register', 'akun', 'login', 'daftar', 'butuh akun', 'konsultasi'],
    answer: 'Fitur login dan register saat ini hanya untuk Admin Panel kami. Untuk pelanggan, Anda tidak perlu akun. Langsung hubungi kami via halaman Contact untuk konsultasi project software development Anda. Kami spesialis dalam custom software seperti web apps, mobile apps, dan AI solutions!'
  },
  {
    keywords: ['pesan', 'order', 'beli', 'hubungi', 'project', 'cara pesan', 'jasa development'],
    answer: 'Untuk memesan produk/jasa software development, isi form di halaman Contact. Kami akan balas via email atau WhatsApp yang Anda cantumkan untuk diskusikan detail project, seperti requirement gathering, tech stack (React, Node.js, dll), timeline, dan biaya. Contoh: Kami bisa develop custom CRM system dalam 4-8 minggu!'
  },
  {
    keywords: ['demo', 'trial', 'contoh', 'ada demo', 'gratis'],
    answer: 'Ya, kami sediakan demo gratis untuk sebagian besar produk software kami. Hubungi via Contact untuk jadwalkan sesi demo. Misalnya, demo web app kami menggunakan Framer Motion untuk animasi smooth seperti ini chatbot!'
  },
  {
    keywords: ['lama', 'proses', 'waktu', 'pengerjaan', 'berapa lama', 'project custom'],
    answer: 'Waktu pengerjaan project software custom tergantung kompleksitas, rata-rata 4-12 minggu. Kami pakai agile methodology untuk faster iteration. Contoh: Simple web app bisa selesai 4 minggu, full enterprise system 8-12 minggu. Mari diskusikan project Anda!'
  },
  {
    keywords: ['layanan', 'jasa', 'software', 'development', 'tersedia', 'apa saja'],
    answer: 'Sebagai perusahaan software development, kami spesialis dalam: Custom Web/Mobile Apps, AI/ML Integration, Cloud Solutions (AWS/Azure), dan DevOps. Tech stack kami: React, Next.js, Node.js, Python, dan lebih. Ready to code your vision?'
  }
];

// Suggested questions - diintegrasikan ke faqDatabase via keywords
const suggestedQuestions = [
  { text: 'Layanan software development apa yang tersedia?', category: 'services' },
  { text: 'Berapa lama pengerjaan project custom?', category: 'timeline' },
  { text: 'Apakah ada demo gratis?', category: 'demo' },
  { text: 'Cara pesan jasa development?', category: 'order' },
  { text: 'Butuh akun untuk konsultasi?', category: 'account' },
];

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: 'Halo! Saya ByteBot dari ByteCraft Software Development. Spesialis custom web apps, mobile, AI, dan solusi digital lainnya. Mau tanya apa hari ini? 😄\n\nPilih topik cepat atau ketik langsung:', 
      isBot: true 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend) return;

    setMessages(prev => [...prev, { text: textToSend, isBot: false }]);
    setInput('');
    setIsTyping(true);
    setShowSuggestions(false); // Auto hide suggestions setelah kirim

    setTimeout(() => {
      const lowerInput = textToSend.toLowerCase();
      const matched = faqDatabase.find(faq => faq.keywords.some(kw => lowerInput.includes(kw)));
      
      let response = matched 
        ? matched.answer 
        : 'Maaf, saya belum paham maksudnya. Coba jelaskan lebih detail ya! Atau langsung hubungi tim kami di halaman Contact untuk diskusi project software Anda. Contoh pertanyaan: "Berapa lama bikin app custom?"';

      if (lowerInput.includes('contoh') || lowerInput.includes('code')) {
        response += '\n\nContoh produk kami bisa anda temukan di page products, dan dokumentasinya ada di page gallery\n';
      }

      setMessages(prev => [...prev, { text: response, isBot: true }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickQuestion = (question: string) => {
    handleSend(question);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 transition-all duration-300 sm:bottom-8 sm:right-8"
      >
        <Code2 className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-28 right-6 z-50 flex h-[70vh] max-h-[600px] w-[90vw] max-w-[420px] flex-col overflow-hidden rounded-2xl border border-violet-500/30 bg-zinc-900/95 backdrop-blur-2xl shadow-2xl shadow-violet-950/50 sm:bottom-10 sm:right-10 sm:h-auto sm:max-h-[80vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-violet-500/20 bg-gradient-to-r from-violet-950/90 to-purple-950/90 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600/30">
                  <Code2 className="h-5 w-5 text-violet-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base sm:text-lg">ByteBot</h3>
                  <p className="text-xs text-violet-300">ByteCraft Software Dev</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gradient-to-b from-zinc-900 to-black/80">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-inner sm:max-w-[78%] sm:px-5 sm:py-3.5 ${
                        msg.isBot 
                          ? 'bg-violet-950/70 text-violet-100 backdrop-blur-md' 
                          : 'bg-purple-950/70 text-purple-100 backdrop-blur-md'
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-2 rounded-2xl bg-violet-950/70 px-5 py-3 backdrop-blur-md">
                      <motion.span 
                        animate={{ y: [0, -6, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.8 }} 
                        className="h-2.5 w-2.5 rounded-full bg-violet-400" 
                      />
                      <motion.span 
                        animate={{ y: [0, -6, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} 
                        className="h-2.5 w-2.5 rounded-full bg-violet-400" 
                      />
                      <motion.span 
                        animate={{ y: [0, -6, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} 
                        className="h-2.5 w-2.5 rounded-full bg-violet-400" 
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} /> {/* Anchor for scrolling */}
            </div>

            {/* Input Area with Expandable Suggestions */}
            <div className="space-y-3 border-t border-violet-500/20 bg-gradient-to-r from-violet-950/90 to-purple-950/90 px-4 py-4 sm:px-5">
              {/* Expandable Suggestions */}
              <motion.div
                initial={false}
                animate={{ height: showSuggestions ? 'auto' : 0, opacity: showSuggestions ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                {showSuggestions && (
                  <div className="space-y-2 pb-3">
                    <motion.p 
                      className="text-xs text-violet-400 font-medium"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Pertanyaan populer:
                    </motion.p>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {suggestedQuestions.map((suggestion, index) => (
                        <motion.button
                          key={suggestion.text}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            handleQuickQuestion(suggestion.text);
                            setShowSuggestions(false); // Hide after click
                          }}
                          className="group w-full rounded-lg bg-white/5 px-4 py-3 text-left text-sm font-medium text-violet-200 backdrop-blur-sm border border-violet-500/20 hover:border-violet-400/50 hover:bg-white/10 transition-all duration-200 flex items-center justify-between"
                        >
                          <span>{suggestion.text}</span>
                          <motion.div
                            className="h-2 w-2 rounded-full bg-violet-400"
                            whileHover={{ scale: 1.3 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          />
                        </motion.button>
                      ))}
                    </div>
                    
                    <motion.button
                      onClick={() => setShowSuggestions(false)}
                      className="text-xs text-violet-400 hover:text-violet-300 mt-2 flex items-center gap-1 transition-colors"
                    >
                      <X className="h-3 w-3" />
                      Sembunyikan saran
                    </motion.button>
                  </div>
                )}
              </motion.div>

              {/* Toggle Button */}
              {!showSuggestions && (
                <motion.button
                  onClick={() => setShowSuggestions(true)}
                  className="mx-auto mb-2 flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-violet-300 hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronDown className="h-3 w-3" />
                  Lihat pertanyaan populer
                </motion.button>
              )}

              {/* Input Area */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tanya tentang software dev..."
                  className="flex-1 rounded-full border border-violet-500/30 bg-violet-950/60 px-5 py-3 text-sm text-white placeholder-violet-300 focus:border-violet-400 focus:outline-none transition duration-200"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}