import { createEdgeProxy } from '../../deploy/functions/edge-proxy.mjs';

export default createEdgeProxy({
  paths: ['/.netlify/functions/deepy'],
  env: { get: key => Netlify.env.get(key) },
});
export const config = { path: '/.netlify/functions/deepy', onError: 'fail' };
