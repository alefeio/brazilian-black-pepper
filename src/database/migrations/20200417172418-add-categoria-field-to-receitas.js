'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('receitas', 'categoria', {
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
      defaultValue: 'Sem categoria',
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('receitas', 'categoria');
  },
};
