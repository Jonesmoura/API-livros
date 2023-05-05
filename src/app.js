import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

// tratativa inicial erro 
db.on("erro", console.log.bind(console,"Erro de conexão"));

//tentativa inicial de conexão

db.once("open", ()=> {

  console.log("Conexão com o banco feita com sucesso");

});

const app = express();

// usamos este metodo para que seja interpretado os dados do json ao utilizar a requisição post

app.use(express.json());

routes(app);


export default app;

