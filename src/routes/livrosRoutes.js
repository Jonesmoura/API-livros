import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";


const router = express.Router();

// ao trabalhar com o express inserir a rota na ordem da mais específica para a menos específica

router
  .get("/livros", LivroController.listarLivros, paginar)
  .get("/livros/busca", LivroController.listarLivroPorFiltro, paginar)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivros)
  .get("/livros/:id", LivroController.listarLivroID)
  .delete("/livros/:id", LivroController.excluirLivro);


export default router;
