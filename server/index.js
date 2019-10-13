const config = require('config');
const bunyan = require('bunyan');

const app = require('./app');

const log = bunyan.createLogger(config.log);
const port = process.env.PORT || config.port;

app.listen(port);
log.info('server started on:', port);
