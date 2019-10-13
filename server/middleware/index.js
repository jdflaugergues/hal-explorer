'use strict';

const error = require('./koa-error');
const logging = require('./koa-logging');
const pagination = require('./koa-pagination');
const requestId = require('./koa-request-id');
const responseTime = require('./koa-response-time');
const transmittedHeaders = require('./koa-transmitted-headers');
const validateBody = require('./koa-validate-body');
const validateQuery = require('./koa-validate-query');

module.exports = {
  error,
  logging,
  pagination,
  requestId,
  responseTime,
  transmittedHeaders,
  validateBody,
  validateQuery
};
