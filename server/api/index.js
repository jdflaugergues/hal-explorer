'use strict';

const Router = require('koa-router');
const halson = require('halson');
const _ = require('lodash');
const { mountPoint } = require('config');

const authors = require('./authors');
const books = require('./books');

const authorsData = _.cloneDeep(require('../data/authors'));
const booksData = _.cloneDeep(require('../data/books'));

const router = new Router();

router.get('/ping', (ctx) => {
  ctx.body = 'HAL explorer OK';
});

router
  .use(async (ctx, next) => {
    ctx.state.db = {
      authors: authorsData,
      books: booksData
    };
    await next();
  })
  .use('/authors', authors.routes(), authors.allowedMethods())
  .use('/books', books.routes(), books.allowedMethods())
  .get('/', async (ctx) => {
    ctx.type = 'application/hal+json';
    ctx.body = halson({
      welcome: 'Welcome to HAL explorer demo server',
      hint_1: 'Click the book icon to read docs for the link relation',
      hint_2: 'Click the blue buttons on the right to follow a link with a GET request',
      hint_3: 'Click the green buttons on the right to make a POST request'
    })
      .addLink('self', `${mountPoint}/`)
      .addLink('curies', [{ name: 'hal', href: `${mountPoint}/docs/resources/{rel}.md`, templated: true }])
      .addLink('hal:authors', { href: `${mountPoint}/authors`, title: 'Authors' })
      .addLink('hal:books', { href: `${mountPoint}/books`, title: 'Books' })
  });

module.exports = router;
