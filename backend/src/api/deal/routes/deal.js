'use strict';

/**
 * deal router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::deal.deal', {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});