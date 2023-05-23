import NaoEncontrado from "../erros/NaoEncontrado.js";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req,res)=> {

    try{

      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);

    }catch(erro){

      res.status(500).json({message:"Erro interno no servidor."});

    }
  };

  static listarAutorID = async (req,res,next)=>{

    try{
      
      const id = req.params.id;
      const autoresResultado = await autores.findById(id);

      if(autoresResultado !== null){

        res.status(200).json(autoresResultado);

      }else{

        next( new NaoEncontrado("Id do Autor não localizado."));

      }

    }catch(erro){

      next(erro);

    }

  };

  static cadastrarAutor = async (req,res,next) => {
    
    try{
      
      let autor = new autores(req.body);
      const autorResultado = await autor.save();
      res.status(201).send(autorResultado.toJSON());

    }catch(erro){

      next(erro);

    }
  };

  static atualizarAutores = async (req, res,next)=>{
    
    try{
      
      const id = req.params.id;
      const retornoAutores = await autores.findByIdAndUpdate(id,{$set:req.body});

      if (retornoAutores === null){

        next( new NaoEncontrado("Id do Autor não localizado."));

      }else{

        res.status(200).send({message:"Autor atualizado com sucesso!"});

      }

    }catch(erro){

      next(erro);

    }
  };

  static excluirAutor = async (req,res,next)=>{

    try{
      
      const id = req.params.id;
      const retornoAutores = await autores.findByIdAndDelete(id);
      if (retornoAutores === null){

        next( new NaoEncontrado("Id do Autor não localizado."));

      }else{

        res.status(200).send({message:"Autor removido com sucesso"});

      }


    }catch(erro){

      next(erro);

    }
  };
    

}

export default AutorController;