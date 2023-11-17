import { Router } from 'express';
import rotasRoupas from './roupas.routes.js';

const rotas = Router();


rotas.use('/roupas', rotasRoupas);

rotas.get('/', (req, res) => {
    return res.send({ message: "Bem vindo a API de roupas da Isabela 👗" });
});

export default rotas;