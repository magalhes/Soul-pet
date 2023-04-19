const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Cliente = require("./cliente");


const Pet = connection.define("pet",{
    nome:{
        type: DataTypes.STRING(150),
        allowNull: false
    },
    tipo:{
        type: DataTypes.STRING(150),
        allowNull: false
    },
    porte:{
        type: DataTypes.STRING(100),
        allowNull:false
    },
    dataNasc:{
        type: DataTypes.DATEONLY
        
       
    },
    porte:{
        type: DataTypes.STRING(140),
        allowNull: false
    }

});
//Cria uma relação de um pra muitos 1:n
Cliente.hasMany(Pet , {onDelete: "CASCADE"}) // CASCADE = quando o cliente for deletado, Todos os pets serao deletados
Pet.belongsTo(Cliente); //um pet pertence a um cliente, porque cada pet possui um id diferente

module.exports = Pet;