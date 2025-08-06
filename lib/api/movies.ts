import { api } from './base';

export const moviesApi = {
  nowShowing: () => api.get('/movies/now_showing'),
  topWatched: () => api.get('/movies/top_watched'),
};
