// hooks/useChat.ts
import { useState } from 'react';
import { chatApi } from '@/lib/api/chat';

export function useChat(email?: string, sessionId?: string, token?: string) {
  const [messages, setMessages] = useState<{ from: 'user' | 'agent'; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const send = async (message: string) => {
    setMessages((prev) => [...prev, { from: 'user', text: message }]);
    setIsLoading(true);
    try {
      const res = await chatApi.sendMessage(message, sessionId, token);
      setMessages((prev) => [...prev, { from: 'agent', text: res.response }]); // response, not reply!
    } catch (err: any) {
      setMessages((prev) => [...prev, { from: 'agent', text: 'Xin lỗi, đã xảy ra lỗi.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, send, isLoading };
}
