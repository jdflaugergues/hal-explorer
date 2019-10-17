'use strict';

const authorsRouter = require('koa-router')();
const bodyParser = require('koa-body');
const halson = require('halson');
const _ = require('lodash');
const { ObjectID } = require('bson');
const { mountPoint, paginationPerPage } = require('config');

const authorPostSchema = require('../schemas/author-post');
const hal = require('../lib/hal');
const { errors } = require('../lib/errors');
const { pagination, validateQuery, validateBody } = require('../middleware');
const paginationConfig = { unit: 'authors', maximum: paginationPerPage };

function restoreDefaultData(ctx) {
  ctx.state.db = {
    authors: _.cloneDeep(require('../data/authors')),
    books: _.cloneDeep(require('../data/books'))
  };
}

authorsRouter
  .get('/', validateQuery, pagination(paginationConfig), getAuthors)
  .get('/:authorId', getAuthor)
  .post('/', bodyParser(), validateBody(authorPostSchema), createAuthor)
  .put('/:authorId', bodyParser(), validateBody(authorPostSchema), replaceAuthor)
  .patch('/:authorId', bodyParser(), updateAuthor)
  .delete('/:authorId', deleteAuthor);

async function getAuthor(ctx) {
  const authorsData = ctx.state.db.authors;
  const booksData = ctx.state.db.books;
  const author = _.find(authorsData, { _id: ctx.params.authorId });
  const books = _.filter(booksData, { authorId: ctx.params.authorId });

  ctx.assert(author, 404, `No author for id ${ctx.params.authorId}`, { code: errors.NOT_FOUND });

  ctx.body = halson(author).addLink('self', `${mountPoint}/authors/${author._id}`);
  if (books.length) {
    ctx.body.addLink('books', `${mountPoint}/books?q={"authorId": "${ctx.params.authorId}"}`);
  }
  ctx.status = 200;
}

async function getAuthors(ctx) {
  const authorsData = ctx.state.db.authors;
  const q = ctx.query.q && JSON.parse(ctx.query.q);
  const baseUrl = `${mountPoint}/authors`;
  if (!authorsData.length) {
    restoreDefaultData(ctx);
  }
  const filteredAuthors = _.filter(authorsData, q);

  ctx.state.pagination.length = filteredAuthors.length;

  const embeddedAuthors = filteredAuthors
    .slice(ctx.state.pagination.offset, ctx.state.pagination.offset + ctx.state.pagination.limit)
    .map((author) => {
      return halson(author).addLink(
        'self',
        `${mountPoint}/authors/${author._id}`
      );
    });

  const resources = halson({
    count: embeddedAuthors.length,
    totalCount: filteredAuthors.length
  })
    .addEmbed('authors', embeddedAuthors);

  hal.addListLinks(resources, baseUrl, ctx.state.pagination, filteredAuthors.length);

  ctx.type = 'application/hal+json';
  ctx.body = resources;
  ctx.status = 200;
}

async function deleteAuthor(ctx) {
  const authorsData = ctx.state.db.authors;
  const removedAuthor = _.remove(authorsData, { _id: ctx.params.authorId});

  ctx.assert(removedAuthor.length, 404, `No author for id ${ctx.params.authorId} to delete`, {
    code: errors.NotFoundError
  });

  ctx.status = 204;
}

async function createAuthor(ctx) {
  const authorsData = ctx.state.db.authors;
  const author = {
    _id: new ObjectID(),
    ...ctx.request.body
  }

  authorsData.push(author);

  ctx.response.set('Location', `${mountPoint}/authors/${author._id}`);
  ctx.type = 'application/hal+json';
  ctx.body = halson(author)
    .addLink('self', `${mountPoint}/authors/${author._id}`);
  ctx.status = 201;
}

async function replaceAuthor(ctx) {
  const authorsData = ctx.state.db.authors;
  const authorIndex = _.findIndex(authorsData, { _id: ctx.params.authorId });
  ctx.assert(authorIndex !== -1, 404, `No author for id ${ctx.params.authorId}`, { code: errors.NOT_FOUND });

  const newAuthor = {
    _id: ctx.params.authorId,
    ...ctx.request.body
  };
  authorsData[authorIndex] = newAuthor;

  ctx.type = 'application/hal+json';
  ctx.body = halson(newAuthor).addLink('self', `${mountPoint}/authors/${newAuthor._id}`);
  ctx.status = 200;
}

async function updateAuthor(ctx) {
  const authorsData = ctx.state.db.authors;
  const authorIndex = _.findIndex(authorsData, { _id: ctx.params.authorId });
  ctx.assert(authorIndex !== -1, 404, `No author for id ${ctx.params.authorId}`, { code: errors.NOT_FOUND });

  const updatedAuthor = {
    ...authorsData[authorIndex],
    ...ctx.request.body
  };
  authorsData[authorIndex] = updatedAuthor;

  ctx.type = 'application/hal+json';
  ctx.body = halson(updatedAuthor).addLink('self', `${mountPoint}/authors/${updatedAuthor._id}`);
  ctx.status = 200;
}

module.exports = authorsRouter;
