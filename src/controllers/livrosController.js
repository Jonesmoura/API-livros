import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req,res)=> {

    //utilizando método da biblioteca do mongoose
    try{

      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosResultado);

    }catch(erro){

      res.status(500).json({message:"Erro interno no servidor"});

    }
  };

  static listarLivroID = async (req,res)=>{

    const id = req.params.id;

    //utilizando método da biblioteca do mongoose

    try{

      const livrosResultado = await livros.findById(id)
        .populate("autor","nome").populate("editora", "nome")
        .exec();
      res.status(200).send(livrosResultado);
      

    }catch(erro){

      res.status(400).send({message: `${erro.message} - ID do livro não localizada`});

    }
  };

  static cadastrarLivro = async(req,res) => {

    try{

      let livro = new livros(req.body);
      const livroResultado = await livro.save();
      res.status(201).send(livroResultado.toJSON());

    }catch(erro){

      res.status(500).send({message: `${erro.message} - falha ao cadastrar livro.`});

    }
  };

  static atualizarLivros = async (req, res)=>{

    //utilizando método da biblioteca do mongoose
    
    try{
      
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, {$set:req.body});
      res.status(200).send({message: "Livro atualizado com sucesso"});

    }catch(erro){

      res.status(500).send({message: erro.message});

    }
  };

  static excluirLivro = async (req,res)=>{

    //utilizando método da biblioteca do mongoose
    
    try{
      
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({message: "Livro removido com sucesso"});
      
    }catch(erro){

      res.status(500).send({message:erro.message});

    }
  };

  static listarLivroPorEditora = async (req,res)=>{
    
    try{
      
      const editora = req.query.editora;
      const livrosResultado = await livros.find({"editora":editora});
      res.status(200).send(livrosResultado);

    }catch(erro){

      res.status(404).send({message: `${erro.message} - ID da editora não localizado`});

    }

  };
    
}

export default LivroController;