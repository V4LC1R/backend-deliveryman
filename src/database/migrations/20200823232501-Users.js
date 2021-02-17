'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.createTable('users',{
    // campo de identificação
    id:{
      type:Sequelize.INTEGER.UNSIGNED,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false
    },
    name:{
      type:Sequelize.STRING,
      allowNull:false
    },
    cpf_cnpj:{
      type:Sequelize.STRING,
      allowNull:false},
    email:{
      type:Sequelize.STRING,
      allowNull:false
    },
    password:{
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
    return queryInterface.dropTable('users')
  }
};
