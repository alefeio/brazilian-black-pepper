import * as Yup from 'yup';
import Trabalheforms from '../models/Trabalheforms';

import TrabalheMail from '../jobs/TrabalheMail';
import Queue from '../../lib/Queue';

class TrabalheformsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      mensagem: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Falha na validação!' });
    }

    const trabalhe = await Trabalheforms.create(req.body);

    await Queue.add(TrabalheMail.key, trabalhe);

    return res.json(trabalhe);
  }
}

export default new TrabalheformsController();
