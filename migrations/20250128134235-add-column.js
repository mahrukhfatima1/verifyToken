'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    })
    await queryInterface.addColumn('user', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'createdAt');
    await queryInterface.removeColumn('user', 'updatedAt');
  }
};
