'use strict';

const booksRouter = require('koa-router')();
const halson = require('halson');
const _ = require('lodash');
const { mountPoint, paginationPerPage } = require('config');

let booksData = _.cloneDeep(require('../data/books'));
const hal = require('../lib/hal');
const { errors } = require('../lib/errors');
const { pagination, validateQuery } = require('../middleware');
const paginationConfig = { unit: 'books', maximum: paginationPerPage };

function restoreDefaultData(ctx) {
  ctx.state.db = {
    authors: _.cloneDeep(require('../data/authors')),
    books: _.cloneDeep(require('../data/books'))
  };
}

booksRouter
  .get('/', validateQuery, pagination(paginationConfig), getBooks)
  .get('/:bookId', getBook);

async function getBook(ctx) {
  const book = _.find(booksData, { _id: ctx.params.bookId });
  ctx.assert(book, 404, `No book for id ${ctx.params.bookId}`, { code: errors.NOT_FOUND });

  ctx.body = halson(book)
    .addLink('self', `${mountPoint}/books/${book._id}`)
    .addLink('author', `${mountPoint}/authors/${book.authorId}`);
  ctx.status = 200;
}

async function getBooks(ctx) {
  const baseUrl = `${mountPoint}/books`;
  const q = ctx.query.q && JSON.parse(ctx.query.q);

  if (!booksData.length) {
    restoreDefaultData(ctx);
  }
  const filteredBooks = _.filter(booksData, q);

  ctx.state.pagination.length = filteredBooks.length;

  const embeddedBooks = filteredBooks
    .slice(ctx.state.pagination.offset, ctx.state.pagination.offset + ctx.state.pagination.limit)
    .map((book) => {
      return halson(book)
        .addLink('self', `${mountPoint}/books/${book._id}`)
        .addLink('author', `${mountPoint}/authors/${book.authorId}`);
    });

  const resources = halson({
    count: embeddedBooks.length,
    totalCount: filteredBooks.length
  })
    .addEmbed('books', embeddedBooks);

  hal.addListLinks(resources, baseUrl, ctx.state.pagination, filteredBooks.length);

  ctx.type = 'application/hal+json';
  ctx.body = resources;
  ctx.status = 200;
}


module.exports = booksRouter;
