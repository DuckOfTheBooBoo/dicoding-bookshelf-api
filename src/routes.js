/**
 * List of Hapi.server.routes
 */
const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: () => 'Halo',
  },
];

module.exports = routes;
