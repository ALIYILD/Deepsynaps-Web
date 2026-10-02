# Main web Deepy Hetzner candidate

`deepsynaps.ai` stays on Netlify. Its single deployed Netlify function, `deepy`,
also serves Academy and Lab via the existing CORS rules. This directory lets the
same handler run on a private Hetzner Node 24 process. The Netlify Edge proxy is
**off unless** `HETZNER_FUNCTIONS_PROXY=on`; the original Netlify function
continues to handle traffic with the switch absent.

The HTTP transport, HMAC canonicalization and Edge signer derive from
`ALIYILD/deepsynaps-turkiye` commit `d9a24bf5` at
`deploy/functions/{runtime,attestation,edge-proxy}.mjs`. The first two files
are copied unchanged; the Edge proxy restricts its backend hostname to
`api.deepsynaps.ai` rather than the Türkiye domain. No site identity, database
or credentials are shared with Türkiye.

Rehearsal: run `npm ci`, `npm run test:hetzner`, `npm test`, and use
`FUNCTION_MODE=rehearsal PUBLIC_ORIGIN=https://deepsynaps.ai PORT=8384
BIND_HOST=127.0.0.1 node deploy/functions/server.mjs`. The server has only
`/.netlify/functions/deepy` and `/healthz`; no scheduler. For a Docker-private
network, bind to `0.0.0.0` **inside** the container and publish no host port.
Production mode refuses to start without a 32-byte-or-longer
`HETZNER_EDGE_SECRET`. Its Edge signer binds method, exact path and query,
timestamp, client IP, nonce, and SHA-256 of raw bytes; the server rejects
missing, stale, changed or replayed signatures and replaces spoofable client
IP headers. The HTTPS origin must be exactly `api.deepsynaps.ai`.

No production routing is activated by this candidate. Before switching:
provision private target runtime and matching secret, create and verify DNS/TLS
for `api.deepsynaps.ai`, compare the published Netlify handler revision, carry
over only required secrets through a private channel, test Deepy from Web,
Academy and Lab, verify lead Telegram delivery and durable CRM behavior with
authorized synthetic data, then set the site-scoped Netlify switch. Preserve
the original function and a tested return path through the observation window.
Do not claim real provider or delivery acceptance from local transport tests.

## 2026-10-02 rehearsal receipt

At source revision `8d540f9` plus this change, the source function's 49 tests,
four transport/handler tests, Vite build, touched-path ESLint and Netlify
offline deploy-preview packaging passed. The root `npm run lint` still fails on
eight unrelated, existing frontend UI rule violations; none is in the changed
paths. A clean offline `npm ci` rebuilt the same server SHA-256 twice:
`cf5b337484cf65791d148256f9e901f0b87fba53115c53b374e7480914a8e113`.

That exact bundle is running on CX43 under
`/opt/deepsynaps-web-deepy-rehearsal/releases/<SHA>/` using pinned Node image
`sha256:ba849c60be29959425b8734d57b8b4b7d56f98edd9504c9af091d5281095a71e`.
The internal-only container exposed zero host ports. Health returned 200; a
synthetic Academy question returned 200; a synthetic lead returned the truthful
503 because Telegram is deliberately unconfigured. No external provider was
called. Idle memory was 18.27 MiB against a 384 MiB container limit. No
Netlify deploy, Edge switch, Caddy route, DNS or production secret changed.
