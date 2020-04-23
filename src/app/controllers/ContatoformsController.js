import * as Yup from 'yup';
import Contatoforms from '../models/Contatoforms';

import ContatoMail from '../jobs/ContatoMail';
import Queue from '../../lib/Queue';

class ContatoformsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Falha na validação!' });
    }

    const contato = await Contatoforms.create(req.body);

    await Queue.add(ContatoMail.key, contato);

    return res.json(contato);
  }
}

export default new ContatoformsController();
