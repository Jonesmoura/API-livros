import mongoose from "mongoose";

const LivroSchema = mongoose.Schema(

  {

    id:{type:String},
    titulo:{
      type:String, 
      required:[true,"O título do livro é obrigatório"]
    },
    autor:{
      type:mongoose.Schema.Types.ObjectId, 
      ref:"autores", 
      required:[true, "Autor obrigatório"]
    },
    editora:{
      type:mongoose.Schema.Types.ObjectId, 
      ref:"editoras", 
      required:[true,"A editora é obrigatória"]
    },
    numeroPaginas:{type:Number}

  }

);

const livros = mongoose.model("livros", LivroSchema);


export default livros;