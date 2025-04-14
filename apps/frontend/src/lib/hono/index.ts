import type { AppType } from '@apps/backend/app';
import { hc } from 'hono/client';

// TODO AppTypeを修正
export const client = hc<AppType>('http://localhost:8787/', {
  headers: {
    'Content-Type': 'application/json',
  },
});
