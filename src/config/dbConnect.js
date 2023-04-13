import mongoose from "mongoose";

//O parametro para conexão é a string gerada no mongoDB atlas 

mongoose.connect(process.env.STRING_CONEXAO_DB);

let db = mongoose.connection;

export default db;

