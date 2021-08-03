'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'firstName',
        {
            type: Sequelize.STRING,
            allowNull: false,
        }
    )
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('Users', 'firstName')]);
  }
};