import { api } from './base';

export const ticketsApi = {
  getTickets: (email: string) => api.post('/tickets/get', {email}),
};
