const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookById,
  deleteBookById,
} = require('./handler');

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
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookById,
  },
];

module.exports = routes;
