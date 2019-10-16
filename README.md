[![Build Status](https://travis-ci.org/jdflaugergues/hal-explorer.svg?branch=master)](https://travis-ci.org/jdflaugergues/hal-explorer)

# HAL Explorer

> An API browser for the application/hal+json media type.

Details about HAL can be found [here](https://github.com/mikekelly/hal_specification).

## Example Usage
Here is an example of usage:

https://hal-explorer.herokuapp.com

## Usage Instructions
To integrate HAL Explorer in your own REST API project, all you should need is to copy `dist` folder of this project in your served public folder.
Example in Node.js with Koa framework.
```ecmascript 6
const Koa = require('koa');
const path = require('path');

const app = new Koa();
app.use(serve(path.join(__dirname, './public')));

```

According `dist` content is copied in `public/api/docs/`, the `HAL Explorer` UI will be available at `http://<your-domain>/api/docs` address.

## Contributors

### Current

- [Jonathan de Flaugergues](https://github.com/jdflaugergues)

## License

[MIT](http://opensource.org/licenses/MIT)
