const { getDataJson } = require("../utils/funtions");

module.exports = {
  async getUser(id) {
    const newUserId = Number(id)
    try {
        if (!newUserId)
            throw new Error('Insira um id valido')
           
        const users = await getDataJson("users");
        const findUser = users.find((user) => user.id === newUserId);
        const indexUser = users.indexOf(findUser)
        
        if (!findUser)
            throw new Error('Usuario não encontrado')
        
        return {findUser,indexUser}
    } catch (error) {
        return { error: error.message }
    }
    
  },
};
