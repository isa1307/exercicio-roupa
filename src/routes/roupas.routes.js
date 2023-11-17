import { Router } from "express";
import{
    pegarRoupas,
    pegarRoupaPorId,
    adicionarRoupa,
    atualizarRoupa,
    deletarRoupa
} from '../controllers/roupas.controller.js';

const rotasRoupas = Router();

rotasRoupas.get("/", pegarRoupas);
rotasRoupas.get("/:id", pegarRoupaPorId);
rotasRoupas.post("/", adicionarRoupa);
rotasRoupas.put("/:id", atualizarRoupa);
rotasRoupas.delete("/:id", deletarRoupa);


export default rotasRoupas;