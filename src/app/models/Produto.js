import Sequelize, { Model } from 'sequelize';

class Produtos extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        codigo: Sequelize.STRING,
        marca: Sequelize.STRING,
        embalagem: Sequelize.STRING,
        peso: Sequelize.STRING,
        informacaoalergica: Sequelize.STRING,
        garantia: Sequelize.STRING,
        paisorigem: Sequelize.STRING,
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

export default Produtos;
