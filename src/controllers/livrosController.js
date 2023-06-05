import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";
class LivroController {

  static listarLivros = async (req,res,next)=> {

    //utilizando método da biblioteca do mongoose
    try{

      const buscaLivros = livros.find();
      req.resultado = buscaLivros;
      next();


    }catch(erro){

      next(erro);

    }
  };

  static listarLivroID = async (req,res,next)=>{

    const id = req.params.id;

    try{

      // desativando o autopopulate e criando populate manual
      const livrosResultado = await livros
        .findById(id,{}, {autopopulate:false})
        .populate("autor","nome");

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

  static listarLivroPorFiltro = async (req,res,next)=>{
    
    try{

      const busca = await processaBusca(req.query); 

      if(busca !== null){

        const livrosResultado = livros.find(busca);
        req.resultado = livrosResultado;
        next();

      }else{

        res.status(200).send([]);

      }

    }catch(erro){

      next(erro);

    }

  };
    
}

async function processaBusca(parametros){

  const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = parametros;
  let busca = {};
  // filtro com operadores do mongodb
  if(titulo) busca.titulo = {$regex: titulo, $options: "i" };
  if(editora) busca.editora = editora;

  if(minPaginas && maxPaginas){

    busca.numeroPaginas = {

      $lte:maxPaginas,
      $gte:minPaginas

    };

  }else if(maxPaginas){

    busca.numeroPaginas = {$lte:maxPaginas};
    
  }else if(minPaginas){

    busca.numeroPaginas = {$gte:minPaginas};

  }

  if(nomeAutor){

    const autor = await autores.findOne({nome: nomeAutor});


    if(autor !== null){

      busca.autor = autor._id;

    }else{

      busca = null;

    }

  }

  return busca;

}

export default LivroController;
