import Sequelize, { Model } from 'sequelize';

class Contatoforms extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
        assunto: Sequelize.STRING,
        mensagem: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Contatoforms;
