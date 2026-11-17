'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n';

export function AiAssistantModal() {
  const { tr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ sender: 'ai' | 'user'; text: string }>
  >([
    {
      sender: 'ai',
      text: tr.chatbot.greeting,
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  // Update greeting if language changes and only greeting is shown
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [{ sender: 'ai', text: tr.chatbot.greeting }];
      }
      return prev;
    });
  }, [tr.chatbot.greeting]);

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || inputValue).trim();
    if (!q) return;

    const newMessages = [...messages, { sender: 'user' as const, text: q }];
    setMessages(newMessages);
    if (!textToSend) setInputValue('');

    // Match keywords
    const lower = q.toLowerCase();
    let reply = tr.chatbot.answers.default;
    if (lower.includes('neet') || lower.includes('medical') || lower.includes('700') || lower.includes('நீட்') || lower.includes('மருத்துவ')) {
      reply = tr.chatbot.answers.neet;
    } else if (lower.includes('jee') || lower.includes('iit') || lower.includes('engineering') || lower.includes('ஜே.இ.இ') || lower.includes('பொறியியல்')) {
      reply = tr.chatbot.answers.jee;
    } else if (lower.includes('tnpsc') || lower.includes('tamil') || lower.includes('bilingual') || lower.includes('தமிழ்') || lower.includes('டி.என்.பி.எஸ்.சி')) {
      reply = tr.chatbot.answers.tnpsc;
    } else if (lower.includes('voucher') || lower.includes('fee') || lower.includes('discount') || lower.includes('கட்டண') || lower.includes('சலுகை')) {
      reply = tr.chatbot.answers.voucher;
    } else if (lower.includes('campus') || lower.includes('address') || lower.includes('library') || lower.includes('location') || lower.includes('வளாக') || lower.includes('நூலக') || lower.includes('முகவரி')) {
      reply = tr.chatbot.answers.campus;
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
          aria-label={tr.chatbot.advisorName}
          className="w-14 h-14 rounded-full bg-[#101B3D] text-[#C69A48] border border-[#C69A48]/50 shadow-[0_6px_20px_rgba(16,27,61,0.45)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 group cursor-pointer"
          title={tr.chatbot.advisorName}
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
                    {tr.chatbot.advisorName}
                  </h3>
                  <span className="font-label-caps text-[0.625rem] text-secondary-fixed">
                    {tr.chatbot.advisorStatus}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-surface hover:bg-surface/10 transition-colors cursor-pointer"
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
              {tr.chatbot.suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-surface-container text-[0.6875rem] font-label-md text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer whitespace-nowrap"
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
                placeholder={tr.chatbot.inputPlaceholder}
                className="flex-1 px-3 py-2 rounded-lg bg-surface-container text-on-surface font-body-sm text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-primary-container text-surface hover:bg-primary font-label-md text-sm font-semibold flex items-center justify-center transition-colors cursor-pointer"
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
