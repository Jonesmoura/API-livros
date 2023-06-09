import express from "express";
import EditoraController from "../controllers/editorasController.js";

const router = express.Router();

router
  .get("/editoras", EditoraController.listarEditoras) 
  .post("/editoras", EditoraController.cadastrarEditora)
  .put("/editoras/:id", EditoraController.atualizarEditoras) // verificar código github
  .get("/editoras/:id", EditoraController.listarEditoraID)
  .delete("/editoras/:id", EditoraController.excluirEditora);


export default router;