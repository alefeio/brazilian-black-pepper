import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UsuarioController from './app/controllers/UsuarioController';
import SessionController from './app/controllers/SessionController';
import ReceitaController from './app/controllers/ReceitaController';
import FileController from './app/controllers/FileController';
import ProdutoController from './app/controllers/ProdutoController';
import ContatoformsController from './app/controllers/ContatoformsController';
import TrabalheformsController from './app/controllers/TrabalheformsController';
import PontoController from './app/controllers/PontoController';
import BuscaController from './app/controllers/BuscaController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/usuarios', UsuarioController.store);
routes.post('/sessions', SessionController.store);

routes.get('/receitas', ReceitaController.index);
routes.get('/receitas/:id', ReceitaController.detail);

routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:id', ProdutoController.detail);

routes.get('/busca', BuscaController.index);

routes.post('/contato', ContatoformsController.store);

routes.post('/trabalhe', TrabalheformsController.store);

routes.get('/pontos', PontoController.index);
routes.get('/pontos/:id', PontoController.detail);

routes.use(authMiddleware);

routes.get('/usuarios', UsuarioController.index);
routes.put('/usuarios', UsuarioController.update);
routes.delete('/usuarios/:id', UsuarioController.delete);

routes.post('/receitas', ReceitaController.store);
routes.put('/receitas/:id', ReceitaController.update);
routes.delete('/receitas/:id', ReceitaController.delete);

routes.post('/produtos', ProdutoController.store);
routes.put('/produtos/:id', ProdutoController.update);
routes.delete('/produtos/:id', ProdutoController.delete);

routes.post('/pontos', PontoController.store);
routes.put('/pontos/:id', PontoController.update);
routes.delete('/pontos/:id', PontoController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
