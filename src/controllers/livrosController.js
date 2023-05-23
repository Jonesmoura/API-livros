import NaoEncontrado from "../erros/NaoEncontrado.js";
import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req,res,next)=> {

    //utilizando método da biblioteca do mongoose
    try{

      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosResultado);

    }catch(erro){

      next(erro);

    }
  };

  static listarLivroID = async (req,res,next)=>{

    const id = req.params.id;

    //utilizando método da biblioteca do mongoose

    try{

      const livrosResultado = await livros.findById(id)
        .populate("autor","nome").populate("editora", "nome")
        .exec();

      if( livrosResultado !== null){

        res.status(200).send(livrosResultado);

      }else{

        next(new NaoEncontrado("Id do Livro não localizado."));

      }

      

    }catch(erro){

      next(erro);

    }
  };

  static cadastrarLivro = async(req,res,next) => {

    try{

      let livro = new livros(req.body);
      const livroResultado = await livro.save();
      res.status(201).send(livroResultado.toJSON());

    }catch(erro){

      next(erro);

    }
  };

  static atualizarLivros = async (req, res,next)=>{

    //utilizando método da biblioteca do mongoose
    
    try{
      
      const id = req.params.id;
      const retornoLivros = await livros.findByIdAndUpdate(id, {$set:req.body});

      if(retornoLivros === null){

        next(new NaoEncontrado("Id do Livro não localizado."));

      }else{

        res.status(200).send({message: "Livro atualizado com sucesso"});

      }
      

    }catch(erro){

      next(erro);

    }
  };

  static excluirLivro = async (req,res,next)=>{

    //utilizando método da biblioteca do mongoose
    
    try{
      
      const id = req.params.id;
      const retornoLivros = await livros.findByIdAndDelete(id);

      if(retornoLivros === null){

        next(new NaoEncontrado("Id do Livro não localizado."));

      }else{

        res.status(200).send({message: "Livro removido com sucesso"});

      }
      
    }catch(erro){

      next(erro);

    }
  };

  static listarLivroPorEditora = async (req,res,next)=>{
    
    try{
      
      const editora = req.query.editora;
      const livrosResultado = await livros.find({"editora":editora});
      res.status(200).send(livrosResultado);

    }catch(erro){

      next(erro);

    }

  };
    
}

export default LivroController;