'use strict';

const Router = require('koa-router');
const halson = require('halson');
const { mountPoint } = require('config');

const authors = require('./authors');

const router = new Router();

router.get('/ping', (ctx) => {
  ctx.body = 'HAL explorer OK';
});

router
  .use('/authors', authors.routes(), authors.allowedMethods())
  .get('/', async (ctx) => {
    ctx.type = 'application/hal+json';
    ctx.body = halson()
      .addLink('self', `${mountPoint}/`)
      .addLink('curies', [{ name: 'hal', href: `${mountPoint}/rels/{rel}.md`, templated: true }])
      .addLink('hal:authors', { href: `${mountPoint}/authors` })
  });

module.exports = router;
