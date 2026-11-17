'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { FloatingWhatsApp } from '@/components/shared/FloatingWhatsApp';

const AiAssistantModal = dynamic(
  () => import('@/components/shared/AiAssistantModal').then((mod) => mod.AiAssistantModal),
  { ssr: false }
);

export function GlobalClientWidgets() {
  return (
    <>
      <FloatingWhatsApp />
      <AiAssistantModal />
    </>
  );
}
