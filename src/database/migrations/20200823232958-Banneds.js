'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('banneds',{
      id:{
        type:Sequelize.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      user_id:{
        type:Sequelize.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
          model:'users',
          key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      why:{
        type:Sequelize.TEXT,
        allowNull:false
      },
      status:{
        type:Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('banneds')
     
  }
};
