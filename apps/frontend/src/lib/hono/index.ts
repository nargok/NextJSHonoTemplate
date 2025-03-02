import type { AppType } from '@apps/backend/app';
import { hc } from 'hono/client';

export const client = hc<AppType>('http://localhost:8787', {
  headers: {
    'Content-Type': 'application/json',
  },
});
