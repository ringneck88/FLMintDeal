'use strict';

/**
 * deal router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/deals',
      handler: 'deal.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/deals/:id',
      handler: 'deal.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};