// Modelo para gerar a tabela de clientes no MySQL
// Mapeamento: cada propriedade vira uma coluna da tabela

// DataTypes = serve para definir qual o tipo da coluna
const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Endereco = require("./endereco");

const Cliente = connection.define("cliente", {
  // Configurar a coluna 'nome'
  nome: {
    // nome VARCHAR NOT NULL
    type: DataTypes.STRING(130),
    allowNull: false, // NOT NULL
  },
  email: {
    // email VARCHAR UNIQUE NOT NULL
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    // telefone VARCHAR NOT NULL
    type: DataTypes.STRING,
    allowNull: false,
  },
});
//Cliente tem um Endereço
// Endereço ganha uma chave entrageira(nome do model +Id)
Cliente.hasOne(Endereco, {onDelete:"CASCADE"}) // Cliente tem um Endereço
//CASCADE= APAGAR O CLIENTE, FAZ O ENDEREÇO ASSOCIADO A SER APAGADO JUNTO
Endereco.belongsTo(Cliente) // Endereço pertence a um cliente

module.exports = Cliente;
