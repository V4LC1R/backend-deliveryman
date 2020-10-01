'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('job_types',{
      id:{
        type:Sequelize.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      class_job:{
        type:Sequelize.STRING,
        allowNull:false
      },
      created_at:{
        type:Sequelize.DATE,
        allowNull:false
      },
      updated_at:{
        type:Sequelize.DATE,
        allowNull:false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('job_types')
  }
};
