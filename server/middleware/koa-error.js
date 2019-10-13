'use strict';

const { resolveStatusMessage } = require('../lib/errors');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      code: ctx.status,
      status: err.statusMessage || resolveStatusMessage(ctx.status),
      message: err.message,
      details: err.details
    };
    if (ctx.status === 401) {
      ctx.response.set(
        'WWW-Authenticate',
        `Bearer realm="${ctx.state.transmittedHeaders['X-Requester-Name']}"`
      );
    } else if (ctx.status >= 500) {
      ctx.state.logger.error(err, 'Unexpected error');
    } else {
      ctx.state.logger.error(err);
    }
  }
};
