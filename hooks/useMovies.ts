import { useEffect, useState } from 'react';
import { moviesApi } from '@/lib/api/movies';

export function useMovies() {
  const [nowShowing, setNowShowing] = useState([]);
  const [topWatched, setTopWatched] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      moviesApi.nowShowing().then(setNowShowing),
      moviesApi.topWatched().then(setTopWatched),
    ])
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { nowShowing, topWatched, loading };
}

