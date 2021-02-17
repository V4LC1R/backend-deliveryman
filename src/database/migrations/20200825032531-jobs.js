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
      //numero de identificação do job
      number:{
        type:Sequelize.STRING,
        allowNull:false
      },
      price:{
        type:Sequelize.DECIMAL(10,2),
        allowNull:false
      },
      //vagas abertas
      amount:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      //vagas restantes
      remaining:{
        type:Sequelize.INTEGER,
        allowNull:true
      },
      //ainda contratando
      status:{
        type:Sequelize.BOOLEAN,
        allowNull:false
      },
      //se está excluido
      delete_status:{
        type:Sequelize.BOOLEAN,
        allowNull:false
      },
      mode_job_id:{
        type:Sequelize.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
          model:'mode_job',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      //saber se o Job é aberto ou fechado ao público
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
      latitude:{
        type:Sequelize.DECIMAL(9,6),
        allowNull:false
      },
      longitude:{
        type:Sequelize.DECIMAL(9,6),
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
