import Sequelize, { Model } from 'sequelize';

class Receitas extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: Sequelize.STRING,
        tempo: Sequelize.STRING,
        dificuldade: Sequelize.STRING,
        porcoes: Sequelize.STRING,
        ingredientes: Sequelize.STRING,
        modopreparo: Sequelize.STRING,
        ativo: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    this.belongsTo(models.File, { foreignKey: 'img_id', as: 'imagem' });
  }
}

export default Receitas;
