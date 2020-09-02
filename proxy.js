const { CommonConfiguration } = require('@solid-soda/config');
const path = require('path');

const config = new CommonConfiguration('./.env');

const gateway = require('fastify')({ logger: true });

gateway.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
});

gateway.register(require('fastify-http-proxy'), {
  upstream: config.getStringOrThrow('CORE_URL'),
  prefix: '/api/venue/list',
  rewritePrefix: '/v1/venue/list',
});

gateway.listen(8080, '0.0.0.0');
