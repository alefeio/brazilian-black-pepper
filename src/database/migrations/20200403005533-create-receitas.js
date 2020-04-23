'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('receitas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tempo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dificuldade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      porcoes: {
        type: Sequelize.STRING,
      },
      ingredientes: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      modopreparo: {
        type: Sequelize.TEXT,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('receitas');
  },
};
