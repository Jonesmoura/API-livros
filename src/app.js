import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

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

app.use(manipulador404);

// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;

