import * as Yup from 'yup';
import Produto from '../models/Produto';
import File from '../models/File';

class ProdutoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Falha na validação!' });
    }

    if (!req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const {
      nome,
      descricao,
      codigo,
      marca,
      embalagem,
      peso,
      informacaoalergica,
      garantia,
      paisorigem,
      img_id,
    } = req.body;

    const produtoExiste = await Produto.findOne({ where: { nome } });

    if (produtoExiste) {
      return res.status(400).json({ erro: 'Produto já existe!' });
    }

    const usuario_id = req.usuarioId;

    const produto = await Produto.create({
      nome,
      descricao,
      codigo,
      marca,
      embalagem,
      peso,
      informacaoalergica,
      garantia,
      paisorigem,
      usuario_id,
      img_id,
    });

    return res.json(produto);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const produtos = await Produto.findAll({
      where: { ativo: true },
      order: ['created_at'],
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

    return res.json(produtos);
  }

  async detail(req, res) {
    const busca = req.params.id;

    const produtos = await Produto.findOne({
      where: { id: busca, ativo: true },
      include: [
        {
          model: File,
          as: 'imagem',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(produtos);
  }

  async update(req, res) {
    if (!req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(400).json({ erro: 'Não encontrado!' });
    }

    await produto.update(req.body);

    return res.json(produto);
  }

  async delete(req, res) {
    if (!req.usuarioAdmin) {
      return res.status(401).json({ erro: 'Operação não autorizada!' });
    }

    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(400).json({ erro: 'Não encontrado!' });
    }

    produto.ativo = false;

    produto.save();

    return res.json(produto);
  }
}

export default new ProdutoController();
