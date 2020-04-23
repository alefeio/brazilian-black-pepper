import Sequelize from 'sequelize';

import Usuario from '../app/models/Usuario';
import File from '../app/models/File';
import Receita from '../app/models/Receita';
import Produto from '../app/models/Produto';
import Contatoforms from '../app/models/Contatoforms';
import Trabalheforms from '../app/models/Trabalheforms';
import Ponto from '../app/models/Ponto';

import databaseConfig from '../config/database';

const models = [
  Usuario,
  File,
  Receita,
  Produto,
  Contatoforms,
  Trabalheforms,
  Ponto,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
