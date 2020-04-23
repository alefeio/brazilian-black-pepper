import Receita from '../models/Receita';
import File from '../models/File';

class ReceitaController {
  async store(req, res) {
    if (!req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const {
      titulo,
      tempo,
      dificuldade,
      porcoes,
      ingredientes,
      modopreparo,
      img_id,
    } = req.body;

    const receitaExiste = await Receita.findOne({ where: { titulo } });

    if (receitaExiste) {
      return res.status(400).json({ erro: 'Receita já existe!' });
    }

    const usuario_id = req.usuarioId;

    const receita = await Receita.create({
      titulo,
      tempo,
      dificuldade,
      porcoes,
      ingredientes,
      modopreparo,
      usuario_id,
      img_id,
    });

    console.log(receita);

    return res.json(receita);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const receitas = await Receita.findAll({
      where: { ativo: true },
      order: ['created_at'],
      attributes: [
        'id',
        'titulo',
        'tempo',
        'dificuldade',
        'porcoes',
        'ingredientes',
        'modopreparo',
      ],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: 'imagem',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(receitas);
  }

  async detail(req, res) {
    const busca = req.params.id;

    const receitas = await Receita.findOne({
      where: { id: busca, ativo: true },
      attributes: [
        'id',
        'titulo',
        'tempo',
        'dificuldade',
        'porcoes',
        'ingredientes',
        'modopreparo',
      ],
      include: [
        {
          model: File,
          as: 'imagem',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(receitas);
  }

  async update(req, res) {
    if (!req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const receita = await Receita.findByPk(req.params.id);

    if (!receita) {
      return res.status(400).json({ erro: 'Não encontrado!' });
    }

    await receita.update(req.body);

    return res.json({ receita });
  }

  async delete(req, res) {
    if (!req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const receita = await Receita.findByPk(req.params.id);

    if (!receita) {
      return res.status(400).json({ erro: 'Não encontrado!' });
    }

    receita.ativo = false;

    receita.save();

    return res.json(receita);
  }
}

export default new ReceitaController();
