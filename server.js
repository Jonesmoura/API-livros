import "dotenv/config.js";
import app from "./src/app.js";
const port = process.env.PORT || 3000;

//subindo o servidor local usando a lib express

app.listen(port, ()=> {console.log(`Servidor escutando em http://localhost:${port}`)});
