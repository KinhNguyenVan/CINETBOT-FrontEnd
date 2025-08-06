import { useEffect, useState } from 'react';
import { ticketsApi } from '@/lib/api/tickets';

export function useTickets(email: string | null) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email) {
      setLoading(true);
      ticketsApi.getTickets(email)
        .then(setTickets)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [email]);

  return { tickets, loading };
}
