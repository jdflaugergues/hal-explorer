'use strict';

const Ajv = require('ajv');

const ajv = new Ajv();

function formatErrorMessage(ajvErrors) {
  if (!ajvErrors || !ajvErrors.length) {
    return;
  }
  const error = ajvErrors[0];

  return [error.dataPath && error.dataPath.substring(1), error.message]
    .filter((item) => item)
    .join(' ');
}

module.exports = (schema) => {
  return async function(ctx, next) {
    const hasBody = ctx.request.body && Object.entries(ctx.request.body).length;

    ctx.assert(hasBody, 400, 'Missing body');

    const valid = ajv.validate(schema, ctx.request.body);

    if (!valid) {
      ctx.state.logger.info('JSON schema validation error', ajv.errors);
    }
    ctx.assert(valid, 400, formatErrorMessage(ajv.errors), { details: ajv.errors });

    ctx.state.data = ctx.request.body;

    await next();
  };
};
