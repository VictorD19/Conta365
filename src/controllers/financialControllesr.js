const { getDataJson, getValuesByDates } = require("../utils/funtions")

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
    }

    
}