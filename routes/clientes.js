const Cliente = require("../database/cliente");
const Endereco = require("../database/endereco")

const {Router} = require("express")

//Criar o grupo de rotas
const router = Router();

// Definição de rotas
router.get("/clientes",async (req,res)=>{
    // SELECT * FROM clientes
    const listaClientes = await Cliente.findAll();
    res.json(listaClientes)
  })

router.get("/clientes/:id",async (req,res)=>{
    const cliente = await Cliente.findOne({where : {id:req.params.id},include:[Endereco],})
    if(cliente){
     res.json(cliente)
    }else{
     res.status(404).json({message: "Usuario não encontrado."})
    }
 })
 router.post("/clientes", async (req, res) => {
   // Coletar os dados do req.body
   const { nome, email, telefone, endereco } = req.body;
 
   try {
     // Dentro de 'novo' estará o o objeto criado
     const novo = await Cliente.create({ nome, email, telefone, endereco }, {include: [Endereco]}); // Permitei inserir cliente e endereco num comando
     res.status(201).json(novo);
   } catch (err) {
     console.log(err);
     res.status(500).json({ message: "Um erro aconteceu." });
   }
 });
 
 
 
 
 router.put("/clientes/:id" , async (req, res)=>{
   // obter identificação do cliente pelos parametros da rota
   const {nome,email,telefone,endereco} = req.body;
   const {id} = req.params;
   try{
     //busca o cliente que sera atualizado, pelo id passada
     const cliente = Cliente.findOne({where:{id}})
     // validar a existencia desse cliente no banco de dados
     if(cliente){
         if(endereco){
           //verifica se o endereço sera atualizado, so ira atualizar o cliente que o endereço e id forem iguais
        await   Endereco.update(endereco, {where:{clienteId:id}})
         }
         await Cliente.update({nome,email,telefone}, {where:{id}})
         res.status(200).json({message: "Cliente atualizado"})
     }else{
       res.status(404).json({message: "Cliente não encontrado"})
     }
   }catch(err){
     res.status(500).json({message: "Um erro aconteceu ", err});
   }
 })
 //exluir o cliente
 router.delete("/clientes/:id",async (req,res) =>{
   const {id} = req.params
   const cliente = await Cliente.findOne({where:{id}})
  try{
   if(cliente){
       await cliente.destroy()
       res.status(200).json({message: "Cliente removido"})
   }else{
     res.status(404).json({message:"Cliente não encontrada"})
   }
 
  }catch(err){
   console.error(err);
   res.status(500).json({message:"Um erro aconteceu"})
  }
  
   
 })

module.exports = router;