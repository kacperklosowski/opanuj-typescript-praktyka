import axios from 'axios';

export function trackSlowRequests(duration: number, url: string) {
  axios.post('/api/tracker', {
    duration,
    url,
  });
}
