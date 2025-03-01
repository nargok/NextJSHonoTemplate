import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { employees } from '@/presentation/routes/employee';

const app = new Hono().basePath('/api').use('*', cors());

const routes = app.route('/', employees);

type AppType = typeof routes;

export { app, type AppType };
