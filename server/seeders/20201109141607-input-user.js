'use strict';

const {hashPassword} = require('../helper/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Users', [
     {
       email: "faris@mail.com",
       password: hashPassword('querty'),
       role: "Customer",
       createdAt: new Date(),
       updatedAt: new Date()
     }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
