import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

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
      required:[true, "Autor obrigatório"],
      autopopulate: true
    },
    editora:{
      type:String, 
      ref:"editoras", 
      required:[true,"A editora é obrigatória"],
      enum:{
        values:["Casa do Código", "Alura"],
        message:"A editora fornecida {VALUE} não é um valor permitido."
      }
    },
    numeroPaginas:{
      type:Number,
      validate: {
        validator:(valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message:"O número de páginas deve estar entre 10 e 5000, o valor ({VALUE}) é inválido."
      }
    }
  }
);

LivroSchema.plugin(autopopulate);
const livros = mongoose.model("livros", LivroSchema);


export default livros;