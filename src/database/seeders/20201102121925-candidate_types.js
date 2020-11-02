'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('candidate_types',[
      {
        class_candidate:'simple Application',
        created_at: new Date(),
        updated_at:new Date()
      },
      {
        class_candidate:'direct Application',
        created_at: new Date(),
        updated_at:new Date()
      }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
