const { addBookHandler, getAllBooksHandler, getBookByIdHandler } = require('./handler');

/**
 * List of Hapi.server.routes
 */
const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
];

module.exports = routes;
