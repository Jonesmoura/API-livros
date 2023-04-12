import mongoose from "mongoose";

//O parametro para conexão é a string gerada no mongoDB atlas 

mongoose.connect("mongodb+srv://jonesms:mateus@cluster0.owdvrfk.mongodb.net/api-node-express");

let db = mongoose.connection;

export default db;

