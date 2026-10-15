import React, { useState } from 'react';
import { X, Send, Bot, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SpecialistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

interface Message {
  sender: 'specialist' | 'user';
  text: string;
  recommendedProductId?: string;
}

export const SpecialistModal: React.FC<SpecialistModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'specialist',
      text: "Hello! I'm an Apple Specialist. Whether you're upgrading your iPhone, choosing the right Mac for creative work, or curious about Trade In values, I'm here to help. What are you looking to accomplish today?",
    },
  ]);
  const [inputText, setInputText] = useState('');

  const quickQuestions = [
    'Which iPhone has the best camera and battery?',
    'Should I choose MacBook Pro M4 or MacBook Air?',
    'How does Apple Trade In work?',
    'Which Apple Watch is best for fitness and diving?',
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMsgs: Message[] = [...messages, { sender: 'user', text: userText }];
    setMessages(newMsgs);
    setInputText('');

    // Generate tailored Specialist reply based on query
    setTimeout(() => {
      let reply: Message;
      const lower = userText.toLowerCase();

      if (lower.includes('iphone') || lower.includes('camera') || lower.includes('phone')) {
        reply = {
          sender: 'specialist',
          text: "For the absolute highest tier mobile photography and videography, the iPhone 16 Pro is unmatched. It features aerospace Grade 5 titanium, the A18 Pro chip, a 48MP Fusion system with 5x Telephoto optical zoom, and the dedicated Camera Control tactile button. Plus, you get up to 33 hours of battery life.",
          recommendedProductId: 'iphone-16-pro',
        };
      } else if (lower.includes('mac') || lower.includes('creative') || lower.includes('laptop')) {
        reply = {
          sender: 'specialist',
          text: "The new MacBook Pro powered by M4 and M4 Pro is built for intense workflows—from 8K ProRes video editing to compiling code and running local AI models. The Liquid Retina XDR display with nano-texture option offers up to 1600 nits of peak brightness and an unprecedented 24 hours of battery life.",
          recommendedProductId: 'macbook-pro-m4',
        };
      } else if (lower.includes('watch') || lower.includes('fitness') || lower.includes('diving')) {
        reply = {
          sender: 'specialist',
          text: "The Apple Watch Ultra 2 in Black Titanium is the premier pick. It has a rugged 49mm titanium enclosure, 3000-nit flat sapphire display, dual-frequency GPS, 100m water resistance, and up to 72 hours of battery in Low Power Mode.",
          recommendedProductId: 'apple-watch-ultra-2',
        };
      } else if (lower.includes('trade in') || lower.includes('credit') || lower.includes('old')) {
        reply = {
          sender: 'specialist',
          text: "Apple Trade In is seamless! When you select your model in our configurator, pick your current smartphone or Mac. We deduct up to $650 instantly from your total purchase price. We will send you a prepaid trade-in kit with your new device.",
          recommendedProductId: 'iphone-16-pro',
        };
      } else {
        reply = {
          sender: 'specialist',
          text: "All our products are crafted with recycled materials, custom Apple silicon, and industry-leading privacy protection. Every order also includes free delivery, free returns within 14 days, and optional 0% APR financing with Apple Card.",
        };
      }

      setMessages((prev) => [...prev, reply]);
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative my-auto max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#fbfbfd] border-b border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0071e3] text-white flex items-center justify-center font-bold text-sm">
              
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#1d1d1f]">Apple Specialist</h3>
              <p className="text-[11px] text-[#6e6e73]">Online · Ready to assist your purchase</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat message stream */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {messages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            const matchedProduct = msg.recommendedProductId
              ? PRODUCTS.find((p) => p.id === msg.recommendedProductId)
              : null;

            return (
              <div
                key={idx}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-[13px] leading-relaxed ${
                    isUser
                      ? 'bg-[#0071e3] text-white font-normal'
                      : 'bg-slate-100 text-[#1d1d1f]'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Inline product recommendation card */}
                {matchedProduct && (
                  <div className="mt-2.5 p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-3 shadow-sm max-w-[85%]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={matchedProduct.image}
                        alt={matchedProduct.name}
                        className="w-10 h-10 object-contain shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="font-semibold text-xs text-slate-900 block truncate">
                          {matchedProduct.name}
                        </span>
                        <span className="text-[11px] text-slate-500 tabular-nums">
                          From ${matchedProduct.startingPrice}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProduct(matchedProduct);
                      }}
                      className="px-3 py-1 rounded-full bg-[#0071e3] text-white text-[11px] font-medium hover:bg-[#0077ed] shrink-0 cursor-pointer"
                    >
                      Configure
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Prompt chips if few messages */}
          {messages.length <= 2 && (
            <div className="pt-2">
              <span className="text-[11px] text-[#86868b] uppercase font-semibold block mb-2">
                Suggested Questions
              </span>
              <div className="flex flex-col gap-1.5">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-left text-xs bg-slate-50 hover:bg-slate-100 p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input box */}
        <div className="p-4 bg-[#f5f5f7] border-t border-black/5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask an Apple Specialist..."
              className="flex-1 bg-white border border-slate-300 rounded-2xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-40 text-white cursor-pointer transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
