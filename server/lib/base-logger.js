'use strict';

const _ = require('lodash');
const bunyan = require('bunyan');

const resHeaderFields = ['allow', 'content-type', 'content-length', 'location'],
  reqHeaderFields = [
    'allow',
    'content-type',
    'content-length',
    'location',
    'x-powered-by',
    'x-request-id'
  ];

function baseLogger(config, customSerializers = {}) {
  const { name, level = 'info' } = config;

  const serializers = Object.assign(
    {
      req(request) {
        return {
          method: request.method,
          url: request.url,
          headers: _.pick(request.headers, reqHeaderFields),
          remoteAddress: request.ip
        };
      },
      err: bunyan.stdSerializers.err,

      res(response) {
        return {
          headers: _.pick(response.headers, resHeaderFields)
        };
      },

      transaction(t) {
        if (t) {
          return {
            user: t.user,
            requestId: t.requestId
          };
        }
      }
    },
    customSerializers
  );

  return bunyan.createLogger({
    name,
    level,
    serializers
  });
}

module.exports = baseLogger;
