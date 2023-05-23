import NaoEncontrado from "../erros/NaoEncontrado.js";
import editoras from "../models/Editora.js";

class EditoraController {

  static listarEditoras = async (req,res)=> {


    try{

      const editoraResultado = await editoras.find();
      res.status(200).json(editoraResultado);

    }catch(erro){

      res.status(500).send({message: `${erro.message} - Erro ao gerar lista de editoras`});

    }
  };

  static listarEditoraID = async (req,res,next)=>{
    
    try{
      
      const id = req.params.id;
      const editoraResultado = await editoras.findById(id);
      
      if(editoraResultado !== null){
        
        res.status(200).send(editoraResultado);

      }else{

        next(new NaoEncontrado("id da Editora não localizado."));

      }

    }catch(erro){

      next(erro);

    }
  };

  static cadastrarEditora = async (req,res,next) => {

    
    try{
      
      let editora = new editoras(req.body);
      await editora.save();
      res.status(201).send(editora.toJSON());

    }catch(erro){

      next(erro);

    }
  };

  static atualizarEditoras = async(req, res,next)=>{

    try{
      
      const id = req.params.id;
      const retornoEditoras = await editoras.findByIdAndUpdate(id,{$set:req.body});
      
      if(retornoEditoras === null){

        next(new NaoEncontrado("Id da editora não localizado"));

      }else{

        res.status(200).send({message:"Editora atualizada com sucesso"});

      }   
    
    }catch(erro){

      next(erro);

    }
  };

  static excluirEditora = async (req,res,next)=>{
    
    try{
      
      const id = req.params.id;
      const retornoEditoras = await editoras.findByIdAndDelete(id);

      if(retornoEditoras === null){

        next(new NaoEncontrado("Id da Editora não localizado"));

      }else{

        res.status(200).send({message:"Editora removida com sucesso"});

      }


    }catch(erro){

      next(erro);
      
    }

  };
}

export default EditoraController;