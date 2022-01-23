const userService = require("../service/user.service");
const { getDataJson, createOrUpdateDataJson } = require("../utils/funtions");

module.exports = {
  async getUserById(req, res) {
    // #swagger.tags = ['Usuario']
    // #swagger.description = 'Retorna os dados de um usuario pelo id.'
    const { id } = req.params;
    try {
      const user = await userService.getUser(id)
      if(user.error)
        throw new Error(user.error)

      return res.status(200).json(user.findUser)
    } catch (error) {
        return res.status(400).json({error: error.message});     
    }
  
  },
  async createUser(req, res) {
    // #swagger.tags = ['Usuario']
    // #swagger.description = 'Cria um usuario..'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    name: 'Jhon Doe',
                    id: 29,
                    email: 'bertramvictor61@gmail.com'
                }
        } */
    const { id, name, email } = req.body;

    if (!id || !name || !email)
      return res
        .status(400)
        .json({ message: "Não foi possivel criao o usuario" });

    try {
      const user = await userService.getUser(id)
     
      if (user.findUser?.id === Number(id)) throw new Error('Usuario ja existe!')
      
      const users = await getDataJson("users")
      users.push({ id, name, email });
      createOrUpdateDataJson("users", users);

      return res.status(200).json({message: 'Usuario criado com sucesso'})
    } catch (error) {
        return res.status(400).json({error: error.message});     
    }
  },
  async updateUser(req, res) {
    // #swagger.tags = ['Usuario']

    // #swagger.description = 'Atualiza dados de um usuario, sendo eles o name ou email.'
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    name: 'Jhon Doe',
                    email: 'bertramvictor61@gmail.com'
                }
        } */
    const { id, name, email, ...plus } = req.body;
    const { id: idUser } = req.params;

    try {
      const user = await userService.getUser(idUser)
      const users = await getDataJson("users");


      if(user.error)
        throw new Error(user.error)

      if (id)
        throw new Error('Não é possivel alterar o id!')
    
      if (Object.keys(plus).length > 0)
        throw new Error("Nao é possivel alterar mais informações alem do nome ou email")
     
      if (name) user.findUser.name = name;
      if (email) user.findUser.email = email;
      users[user.indexUser] = user.findUser;
    
      await createOrUpdateDataJson("users", users);

      return res.status(200).json({message: 'Usuario atualizado com sucesso'})
    } catch (error) {
      return res.status(400).json({error: error.message}); 
    }
  },
};
