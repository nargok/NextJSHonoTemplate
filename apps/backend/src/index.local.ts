import 'reflect-metadata';
import { serve } from '@hono/node-server';
import { app } from './app';

serve({
  fetch: app.fetch,
  port: 8787,
});

console.log('Server is running on port 8787');
