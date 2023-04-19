const { addBookHandler, getAllBooksHandler } = require("./handler");

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
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
];

module.exports = routes;
