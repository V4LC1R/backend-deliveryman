'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('candidates',{
      id:{
        type:Sequelize.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      candidate_type:{
        type:Sequelize.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
          model:'candidate_types',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      job_id:{
        type:Sequelize.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
          model:'jobs',
          key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      deliveryman_id:{
        type:Sequelize.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
          model:'users',
          key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      number:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      observation:{
        type:Sequelize.TEXT,
        allowNull:true
      },
      status:{
        type:Sequelize.BOOLEAN,
        allowNull:true
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
    return queryInterface.dropTable('candidates')
  }
};
