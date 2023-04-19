// Importações principais e variáveis de ambiente
require("dotenv").config();
const express = require("express");
const morgan = require("morgan")
// Configuração do App
const app = express();
app.use(express.json()); // Possibilitar transitar dados usando JSON

// Configuração do Banco de Dados
const { connection, authenticate } = require("./database/database");
authenticate(connection); // efetivar a conexão
// const Cliente = require("./database/cliente") // configurar o model da aplicação
// const Endereco = require("./database/endereco")
// const Pet = require("./database/pet")


// Definição de rotas
const rotasClientes = require("./routes/clientes")
const rotasPets = require("./routes/pets")
//juntar ao app as rotas dos arquivos
app.use(morgan("dev"))
app.use(rotasClientes)
app.use(rotasPets)

// Escuta de eventos (listen)
app.listen(3000, () => {
 //gerar as tabelas a partir do model
 //Force = apaga tudo e recia as tabelas
  connection.sync() //quando for fazer incrementos e sempre bom usar o ({force:true})
  console.log("Servidor rodando em http://localhost:3000");
});
