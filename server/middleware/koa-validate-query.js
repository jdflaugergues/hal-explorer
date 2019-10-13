'use strict';

module.exports = async function(ctx, next) {
  let q;

  if (ctx.query.q) {
    try {
      q = JSON.parse(ctx.query.q);
    } catch (err) {
      ctx.throw(400, 'q parameter must be a valid JSON');
    }

    ctx.state.fields = Object.keys(q).reduce((acc, key) => {
      if (typeof q[key] === 'string' || typeof q[key] === 'number' || typeof q[key] === 'boolean') {
        acc.push(key);
      } else {
        ctx.throw(400, `Invalid key in q parameter: "${key} (${JSON.stringify(q[key])})"`);
      }
      return acc;
    }, []);
  }
  await next();
};
