import express from "express";
import AutorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/autores", AutorController.listarAutores, paginar)
  .post("/autores", AutorController.cadastrarAutor)
  .put("/autores/:id", AutorController.atualizarAutores)
  .get("/autores/:id", AutorController.listarAutorID)
  .delete("/autores/:id", AutorController.excluirAutor);


export default router;