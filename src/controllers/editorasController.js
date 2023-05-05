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

  static listarEditoraID = async (req,res)=>{
    
    try{
      
      const id = req.params.id;
      const editoraResultado = await editoras.findById(id);
      res.status(200).send(editoraResultado);

    }catch(erro){

      res.status(400).send({message: `${erro.message} - ID da editora não localizado`});

    }
  };

  static cadastrarEditora = async (req,res) => {

    
    try{
      
      let editora = new editoras(req.body);
      await editora.save();
      res.status(201).send(editora.toJSON());

    }catch(erro){

      res.status(500).send({message:`${erro.message} - falha ao cadastrar editora.`});

    }
  };

  static atualizarEditoras = async(req, res)=>{

    try{
      
      const id = req.params.id;
      await editoras.findByIdAndUpdate(id,{$set:req.body});
      res.status(200).send({message:"Editora atualizada com sucesso"});
    
    }catch(erro){

      res.status(500).send({message:erro.message});

    }
  };

  static excluirEditora = async (req,res)=>{
    
    try{
      
      const id = req.params.id;
      await editoras.findByIdAndDelete(id);
      res.status(200).send({message:"Editora removida com sucesso"});

    }catch(erro){

      res.status(500).send({message:erro.message});
      
    }

  };
}

export default EditoraController;