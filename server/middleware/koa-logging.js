'use strict';

module.exports = function(baseLogger) {
  return async function(ctx, next) {
    const logger = baseLogger.child({
      transaction: ctx.state
    });

    ctx.state.logger = logger;

    ctx.state.logger.info({ req: ctx.request }, `  <-- ${ctx.request.method} ${ctx.request.url}`);

    try {
      await next();
    } finally {
      ctx.state.logger.info(
        { res: ctx.response },
        `  --> ${ctx.response.request.method} ${ctx.response.request.url} ${ctx.response.status} ${ctx.response.duration}`
      );
    }
  };
};
