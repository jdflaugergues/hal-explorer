const config = require('config');

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: `http://localhost:${config.port}`
      }
    }
  }
};
