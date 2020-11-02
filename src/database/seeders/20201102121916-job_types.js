'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('job_types',[
      {
        class_job:'open Job',
        created_at: new Date(),
        updated_at:new Date()
      },
      {
        class_job:'Close Job',
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
