'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'lastName'
    )
  },
  down: async (queryInterface, Sequelize) => {
      return Promise.all([queryInterface.addColumn(
          'Users',
          'lastName', {
              type: Sequelize.STRING,
              defaultValue: null
          }
      )])
  }
};