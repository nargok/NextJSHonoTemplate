import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { container } from '@/di/container';
import { EmployeeController } from '@/presentation/routes/employee';

const app = new Hono().basePath('/api').use('*', cors());

// middleware
app.use('*', logger());

const employeeController = container.resolve(EmployeeController);

// ルーティングを設定
app.route('/employees', employeeController.getRouter());

// Error handling
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

app.onError((err, c) => {
  console.error('Server error', err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

type AppType = typeof app.routes;

export { app, type AppType };
