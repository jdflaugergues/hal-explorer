'use strict';

const DIGITS = 3;
const SUFFIX = 'ms';

module.exports = async function(ctx, next) {
  const startAt = process.hrtime();

  await next();

  const diff = process.hrtime(startAt);
  const duration = diff[0] * 1e3 + diff[1] * 1e-6;
  const responseTime = `${duration.toFixed(DIGITS)}${SUFFIX}`;

  if (!ctx.response.headerSent) {
    ctx.response.set('X-Response-Time', responseTime);
  }

  ctx.response.duration = responseTime;
};
