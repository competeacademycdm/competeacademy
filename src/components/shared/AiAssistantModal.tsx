'use client';

import React, { useState } from 'react';

const SUGGESTED_QUESTIONS = [
  'What are the target marks & structure for NEET 2025?',
  'How does the IIT-JEE Advanced coaching program run?',
  'Are bilingual Tamil & English notes available for TNPSC?',
  'How do I claim the ₹15,000 Early Bird fee voucher?',
  'What are the library hours and Chennai campus location?',
];

const PREPARED_ANSWERS: Record<string, string> = {
  default:
    'Welcome to Compete Academy! Our admissions desk at Guindy, Chennai is open Monday through Saturday (8:00 AM – 7:30 PM). You can call our senior counseling team directly at +91 94765 43210 or apply for an in-person campus tour.',
  neet: 'For NEET (UG) 2025, our flagship cohort targets 700+ marks with 100% NCERT line-by-line coverage, 48 full-length simulated mock exams, and daily clinical doubt clearance mentored by senior doctors.',
  jee: 'The IIT-JEE Mains & Advanced track is directed by alumni from IIT Madras. It features 200+ proctored mock drills, advanced calculus and mechanics labs, and algorithmic speed techniques.',
  tnpsc:
    'Yes! Our TNPSC Group 1, 2, 4 and VAO programs feature complete bilingual coverage in Tamil and English, with deep Samacheer Kalvi integration and Tamil heritage modules.',
  voucher:
    'You can claim up to ₹15,000 off on 2-Year NEET and JEE classroom programs using code NEET-ELITE-2025 before April 30. Present this code at our Guindy campus or during portal registration.',
  campus:
    'Our central campus is located at 482 Anna Salai, Guindy, Chennai - 600032. It features acoustically calibrated smart lecture halls and the Dr. Sarvepalli Reference Library with 14,000+ volumes.',
};

export function AiAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ sender: 'ai' | 'user'; text: string }>
  >([
    {
      sender: 'ai',
      text: 'Namaste! I am the Compete Academy Academic Advisor. How can I assist your competitive exam preparation today?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || inputValue).trim();
    if (!q) return;

    const newMessages = [...messages, { sender: 'user' as const, text: q }];
    setMessages(newMessages);
    if (!textToSend) setInputValue('');

    // Match keywords
    const lower = q.toLowerCase();
    let reply = PREPARED_ANSWERS.default;
    if (lower.includes('neet') || lower.includes('medical') || lower.includes('700')) {
      reply = PREPARED_ANSWERS.neet;
    } else if (lower.includes('jee') || lower.includes('iit') || lower.includes('engineering')) {
      reply = PREPARED_ANSWERS.jee;
    } else if (lower.includes('tnpsc') || lower.includes('tamil') || lower.includes('bilingual')) {
      reply = PREPARED_ANSWERS.tnpsc;
    } else if (lower.includes('voucher') || lower.includes('fee') || lower.includes('discount')) {
      reply = PREPARED_ANSWERS.voucher;
    } else if (lower.includes('campus') || lower.includes('address') || lower.includes('library') || lower.includes('location')) {
      reply = PREPARED_ANSWERS.campus;
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 400);
  };

  return (
    <>
      <aside className="fixed bottom-36 md:bottom-24 right-4 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="AI Academic Assistant"
          className="w-14 h-14 rounded-full bg-[#101B3D] text-[#C69A48] border border-[#C69A48]/50 shadow-[0_6px_20px_rgba(16,27,61,0.45)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 group"
          title="Ask Compete Academic AI Advisor"
        >
          <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">
            smart_toy
          </span>
        </button>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-primary/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-md bg-surface text-on-surface rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[640px] z-10 overflow-hidden">
            {/* Header */}
            <div className="px-gutter-mobile py-3.5 bg-primary-container text-surface flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">
                    smart_toy
                  </span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-sm font-semibold text-surface">
                    Compete Academic Advisor
                  </h3>
                  <span className="font-label-caps text-[0.625rem] text-secondary-fixed">
                    Powered by Academic Knowledge Base
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-surface hover:bg-surface/10 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-surface-container-lowest">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[85%] ${
                    m.sender === 'user' ? 'self-end' : 'self-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl font-body-sm text-[0.8125rem] leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-secondary text-on-secondary rounded-br-none'
                        : 'bg-surface-container text-on-surface rounded-bl-none border border-surface-container-highest'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 bg-surface-container-low border-t border-surface-container overflow-x-auto flex gap-1.5 no-scrollbar">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-surface-container text-[0.6875rem] font-label-md text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-surface-container-lowest border-t border-surface-container flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about admissions, NEET, JEE, or fees..."
                className="flex-1 px-3 py-2 rounded-lg bg-surface-container text-on-surface font-body-sm text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-primary-container text-surface hover:bg-primary font-label-md text-sm font-semibold flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-base">send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
