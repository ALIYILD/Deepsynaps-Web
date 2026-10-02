import deepy, { config } from '../../netlify/functions/deepy.mjs';
import { createFunctionServer } from './runtime.mjs';

const mode = process.env.FUNCTION_MODE;
if (!['production', 'rehearsal'].includes(mode)) throw new Error('Explicit FUNCTION_MODE required');
if (mode === 'production' && (!process.env.HETZNER_EDGE_SECRET || process.env.HETZNER_EDGE_SECRET.length < 32)) {
  throw new Error('Authenticated ingress required in production');
}
const server = createFunctionServer({
  functions: [{ name: 'deepy', config,
    handler: (request, context) => deepy(request, { ...context, env: process.env }) }],
  origin: process.env.PUBLIC_ORIGIN,
  published: mode === 'production',
  maxBody: 16_000,
  attestationSecret: process.env.HETZNER_EDGE_SECRET,
});
server.listen(Number(process.env.PORT ?? 8384), process.env.BIND_HOST ?? '127.0.0.1');
for (const signal of ['SIGTERM', 'SIGINT']) process.once(signal, () => server.close(() => process.exit(0)));
