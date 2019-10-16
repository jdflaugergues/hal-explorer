const Koa = require('koa');
const router = require('koa-router')();
const serve = require('koa-static');
const config = require('config');
const path = require('path');

const api = require('./api');
const { error, requestId, logging, responseTime, transmittedHeaders } = require('./middleware');
const baseLogger = require('./lib/base-logger');

const logger = baseLogger(config.log);
const app = new Koa();

router.use(config.mountPoint, api.routes());

app.use(logging(logger));
app.use(error);
app.use(requestId);
app.use(responseTime);
app.use(transmittedHeaders('hal-explorer'));
app.use(router.routes());
app.use(router.allowedMethods());

app.use(serve(path.join(__dirname, '../dist')));
app.use(serve(path.join(__dirname, './public')));

router.routes().router.stack.forEach((route) => {
  if (route.methods.length) {
    logger.info(route.methods, route.path);
  }
});

module.exports = app;
