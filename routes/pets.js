
const Cliente = require("../database/cliente");
const Pet = require("../database/pet");

const { Router } = require("express");

// Criar o grupo de rotas (/pets)
const router = Router();

// adiciona um pet se o cliente existir
router.post("/pet", async(req,res) =>{
    const {nome,tipo,dataNasc,porte , clienteId} = req.body

    try{
     
      const cliente = await Cliente.findByPk(clienteId)
      if(cliente){
      const pet = await Pet.create({ nome,tipo,dataNasc,porte, clienteId})   
      res.status(201).json(pet)
      }  else{
        res.status(404).json({messge:"Cliente não existe"})
      }
      

    }catch(err){
      console.log(err)
      res.status(500).json({message: "Um erro aconteceu"})
    }
})
//Chama todos os pets cadastrados
router.get("/pet", async (req,res)=>{
  const listaPets = await Pet.findAll();
  res.json(listaPets)
})
//encontra o pet baseado no id
router.get("/pet/:id" , async (req,res)=>{
  const {id} = req.params

  const pet = await Pet.findByPk(id)
  if(pet){
    res.json(pet)
  }else{
    res.status(404).json({message:"Um erro ocorreu"})
  }
})
router.put("/pet/:id", async (req, res) => {
  // Esses são os dados que virão no corpo JSON
  const { nome, tipo, dataNasc, porte } = req.body;

  // É necessário checar a existência do Pet
  // SELECT * FROM pets WHERE id = "req.params.id";
  const pet = await Pet.findByPk(req.params.id);

  // se pet é null => não existe o pet com o id
  try {
    if (pet) {
      // IMPORTANTE: Indicar qual o pet a ser atualizado
      // 1º Arg: Dados novos, 2º Arg: Where
      await Pet.update(
        { nome, tipo, dataNasc, porte },
        { where: { id: req.params.id } } // WHERE id = "req.params.id"
      );
      // await pet.update({ nome, tipo, dataNasc, porte });
      res.json({ message: "O pet foi editado." });
    } else {
      // caso o id seja inválido, a resposta ao cliente será essa
      res.status(404).json({ message: "O pet não foi encontrado." });
    }
  } catch (err) {
    // caso algum erro inesperado, a resposta ao cliente será essa
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});
router.delete("/pet/:id", async(req,res)=>{
  const pet = await Pet.findByPk(req.params.id);

  try{
    if(pet){ // pet existe, podemos apagar
      await pet.destroy();
      res.json({message: "O pet foi removido"})
    }else{
      res.status(404).json({message:"O pet não foi encontrado"})
    }
  }catch(err){
    console.log(err)
    res.status(500).json({message: "Um erro aconteceu"})
  }
})
module.exports = router;