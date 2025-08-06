import { api } from './base';

export const chatApi = {
  sendMessage: (
    message: string,
    session_id?: string,
    token?: string
  ) =>
    api.post('/chat/agent', { message, session_id}, token),
};
