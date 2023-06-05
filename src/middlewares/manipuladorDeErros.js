import mongoose from "mongoose";
import erroBase from "../erros/erroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro,req,res,next){

  console.log(erro);

  if(erro instanceof mongoose.Error.CastError){

    new RequisicaoIncorreta().enviarResposta(res);

  }else if(erro instanceof mongoose.Error.  ValidationError){

    new ErroValidacao(erro).enviarResposta(res);

  }else if(erro instanceof erroBase){

    erro.enviarResposta(res);

  }else {

    new erroBase().enviarResposta(res);

  }

}

export default manipuladorDeErros;