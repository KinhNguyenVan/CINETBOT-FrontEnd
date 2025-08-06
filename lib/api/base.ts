const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = {
  get: async (path: string, token?: string) => {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) throw await res.json();
    return res.json();
  },

  post: async (path: string, data: any, token?: string) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw await res.json();
    return res.json();
  },
};
