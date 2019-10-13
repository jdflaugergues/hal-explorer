'use strict';

const _ = require('lodash');

module.exports = function(moduleName) {
  return async function(ctx, next) {
    ctx.state.transmittedHeaders = Object.assign(
      {
        'X-Requester-Name': moduleName,
        'X-Request-ID': ctx.state.requestId
      },
      _.pick(ctx.headers, ['accept-language', 'host', 'authorization'])
    );

    await next();
  };
};
