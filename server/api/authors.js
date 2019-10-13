'use strict';

const authorsRouter = require('koa-router')();
const bodyParser = require('koa-body');
const halson = require('halson');
const _ = require('lodash');
const { ObjectID } = require('bson');
const { mountPoint, paginationPerPage } = require('config');

const authorsData = _.cloneDeep(require('../data/authors'));
const authorPostSchema = require('../schemas/author-post');
const hal = require('../lib/hal');
const { errors } = require('../lib/errors');
const { pagination, validateQuery, validateBody } = require('../middleware');
const paginationConfig = { unit: 'authors', maximum: paginationPerPage };

authorsRouter
  .get('/', validateQuery, pagination(paginationConfig), getAuthors)
  .get('/:authorId', getAuthor)
  .delete('/:authorId', deleteAuthor)
  .post('/', bodyParser(), validateBody(authorPostSchema), createAuthor)

async function getAuthor(ctx) {
  const author = _.find(authorsData, { _id: ctx.params.authorId });
  ctx.assert(author, 404, `No author for id ${ctx.params.authorId}`, { code: errors.NOT_FOUND });

  ctx.body = halson(author).addLink('self', `${mountPoint}/authors/${author._id}`);
  ctx.status = 200;
}

async function getAuthors(ctx) {
  const baseUrl = `${mountPoint}/authors`;
  ctx.state.pagination.length = authorsData.length;

  const embeddedAuthors = authorsData
    .slice(ctx.state.pagination.offset, ctx.state.pagination.offset + ctx.state.pagination.limit)
    .map((author) => {
      return halson(author).addLink(
        'self',
        `${mountPoint}/authors/${author._id}`
      );
    });

  const resources = halson({
    count: embeddedAuthors.length
  })
    .addEmbed('authors', embeddedAuthors);

  hal.addListLinks(resources, baseUrl, ctx.state.pagination, authorsData.length);
  ctx.response.set(
    'Access-Control-Allow-Origin',
    `http://haltalk.herokuapp.com`
  );
  ctx.type = 'application/hal+json';
  ctx.body = resources;
  ctx.status = 200;
}

async function deleteAuthor(ctx) {
  const removedAuthor = _.remove(authorsData, { _id: ctx.params.authorId});

  ctx.assert(removedAuthor.length, 404, `No author for id ${ctx.params.authorId} to delete`, {
    code: errors.NotFoundError
  });

  ctx.status = 204;
}

async function createAuthor(ctx) {
  const author = {
    _id: new ObjectID(),
    ...ctx.request.body
  }

  authorsData.push(author);

  ctx.type = 'application/hal+json';
  ctx.body = halson(author)
    .addLink('self', `${mountPoint}/authors/${author._id}`);
  ctx.status = 201;
}

module.exports = authorsRouter;
