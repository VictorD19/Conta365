const { getDataJson, getValuesByDates,createOrUpdateDataJson } = require("../utils/funtions")

module.exports ={
    async getTotalFinancialMonthAndYear (req,res){
        const {userId} = req.params 
        const {typesOfExpenses} = req.query
        console.log(typesOfExpenses);
        
        const newUserId = Number(userId)

        if (!newUserId) 
            return res.status(400).json({message: 'Informe um id valido!'})

        const users = getDataJson('users')
        const findUser = users.find(user => user.id === newUserId)
       
        if (!findUser) 
            return res.status(404).json({message: 'Usuario não encontrado'})
        
        const financialData = getDataJson('financial') 
        const findFinancialData = financialData.find(financialItem => financialItem.userId == newUserId )
               
        if(!findFinancialData)
            return res.json({message: 'Usuario não possui valores!'})
        
        let newListFinancialData = [...findFinancialData.financialData] 
        
        if(typesOfExpenses)
            newListFinancialData  = newListFinancialData.filter(financialItem=> financialItem.typesOfExpenses.toLowerCase() === typesOfExpenses.toLowerCase() )
                    
        const valuesByYears =  getValuesByDates(newListFinancialData)
        // const totalYear = findFinancialData.financialData.reduce((financialA,financialB)=> financialA.price + financialB.price )
        
    

        res.json({total:valuesByYears})
    },
    async deleteFinancial(req,res){
        const {userId,financialId} = req.params
        const newUserId = Number(userId)
        const newFinancialId = Number(financialId)

        if (!newUserId || !newFinancialId ) return res.status(400).json({message:`Formato de id invalido, os ids precisam ser numeros.`})

        const users = getDataJson('users')
        const findUser = users.find(user=> user.id === newUserId)
        if(!findUser) return res.status(404).json({message: 'Usuario não encontrado'})

        
        const financialData = getDataJson('financial')
        const findFinancialData = financialData.find(financialItem=> financialItem.userId === findUser.id)       
         if (!findFinancialData) return res.status(404).json({message:"Não se encontrou registro financiero do usuario"})

        const findFinancialRegister = findFinancialData.financialData.find(financialItem => financialItem.id === newFinancialId)
        if (!findFinancialRegister) return res.status(404).json({message:`Nâo existe nenhum registro com este id: ${newFinancialId}`})

        const newListFinancial = findFinancialData.financialData.filter(financialItem => financialItem.id !== newFinancialId)
        const indexOfFinancialData =  financialData.indexOf(findFinancialData)
    
        findFinancialData.financialData = newListFinancial
        financialData[indexOfFinancialData] = findFinancialData
       
        createOrUpdateDataJson('financial',financialData)
        
        res.json({message:'Registro deletado com successo'})
    }

    
}