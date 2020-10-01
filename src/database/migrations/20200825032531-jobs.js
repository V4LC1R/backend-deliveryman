'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('jobs',{
      id:{
        type:Sequelize.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      company_id:{
        type:Sequelize.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
          model:'users',
          key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      typing_id:{
        type:Sequelize.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
          model:'job_types',
          key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      number:{
        type:Sequelize.STRING,
        allowNull:false
      },
      price:{
        type:Sequelize.DECIMAL(10,2),
        allowNull:false
      },
      amount:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      status:{
        type:Sequelize.BOOLEAN,
        allowNull:false
      },
      start_day:{
        type:Sequelize.DATE,
        allowNull:false
      },
      end_day:{
        type:Sequelize.DATE,
        allowNull:false
      },
      start_office_hour:{
        type:Sequelize.TIME,
        allowNull:false
      },
      end_office_hour:{
        type:Sequelize.TIME,
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
    return queryInterface.dropTable('jobs')
  }
};
