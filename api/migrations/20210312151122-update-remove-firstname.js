'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'firstName'
    )
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.addColumn(
        'Users',
        'firstName', {
          type: Sequelize.STRING,
          defaultValue: null
        }
    )]);
  }
};