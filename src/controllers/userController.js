const { getDataJson, createOrUpdateDataJson } = require("../utils/funtions")

module.exports = {
    async getUserById (req,res){
        const {id} = req.params
      
        const users = getDataJson('users')
        const findUser = users.find(user=> user.id === Number(id))
      
        if(!findUser)return res.status(400).json({message: 'Usuario não encontrado'})

       return res.json(findUser)

    },
    async createUser (req,res){
      const {id,name,email} = req.body

      if(!id || !name || !email) 
        return res.status(400).json({message: 'Não foi possivel criao o usuario'})

      const users = getDataJson('users')
      const findUser = users.find(user=> user.id === Number(id))

      if(findUser) return res.status(400).json({message: 'Usuario ja existe'})

      users.push({id,name,email})

      createOrUpdateDataJson('users',users)

      res.status(201).json({message:'Usuario criado com sucesso'})


        
    },
    async updateUser (req,res){
         const {id,name,email,...plus} = req.body
         const {id: idUser} = req.params
        
         const users = getDataJson('users')
         let findUser = users.find(user=> user.id === Number(idUser))
         const indexUser = users.indexOf(findUser)
         
         if(!findUser) 
            return res.status(400).json({message: `Usuario ${idUser} não existe`})

         if (id)
            return res.status(400).json({message:"Nao é possivel alterar o id"})   
         
         if (Object.keys(plus).length > 0)
            return res.status(400).json({message:"Nao é possivel alterar mais informações alem do nome ou email"})
        
         if(name)
            findUser.name = name

         if (email) 
            findUser.email = email

         users[indexUser] = findUser
         createOrUpdateDataJson('users',users)


        return res.json({message:"Usuario Atualizado com sucesso"})
        
    }

}