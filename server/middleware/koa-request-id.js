'use strict';

const uuidv1 = require('uuid/v1');

module.exports = async function(ctx, next) {
  const requestId = ctx.headers['x-request-id'] || uuidv1();

  ctx.state.requestId = requestId;

  ctx.response.set('X-Request-ID', requestId);

  await next();
};
