const fs = require('fs')

const getMonthTranslate = (numberMonth)=>{
    const listMoths = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
    const month = listMoths.filter((_,index)=>numberMonth === index )
    return month[0]

}

const getDataJson = (fileName)=>{
    const data = JSON.parse(fs.readFileSync(`src/database/${fileName}.json`,'utf8'))
    return data
}

const createOrUpdateDataJson = (fileName,data)=>{
    fs.writeFileSync(`src/database/${fileName}.json`,JSON.stringify(data,null,2))
}
const getValuesByDates = (list)=>{
    const listValuesUser = list.map(item=>{
        const date= new Date(item.date)
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            price: item.price,
            type: item.typesOfExpenses
        }
    })
    const listYears  = listValuesUser.map(item => item.year)
    const noDuplicatedYears = [...new Set(listYears)]
    
    const listValueByYears = noDuplicatedYears.map(year=>{
        let totalYear = {}
       
        const listMonth = []
        const financialByYears = listValuesUser.filter(item=>{
                    if (item.year === year){
                        listMonth.push(item.month)
                        return item

                    }
                })   
        if (financialByYears.length > 1) {
            const notRepeatMonth = [...new Set(listMonth)]
            const listMontValue = notRepeatMonth.map(month =>{
                
                let totalMonth = 0

                const valuesMonth = financialByYears.filter(itemMonth =>{
                    if (itemMonth.month === month) {
                        return itemMonth.price
                    }
                } )
                
                if (valuesMonth.length > 1) 
                    totalMonth = valuesMonth.reduce((itemA,itemB)=> itemA.price+itemB.price)
                    
                if (valuesMonth.length === 1) {
                    const [singleValue] = valuesMonth
                    totalMonth = singleValue.price
                }

               return {
                month: getMonthTranslate(month),
                total: totalMonth,

               }    
            })

            
                 
            totalYear.total = financialByYears.reduce((itemA,itemB)=> itemA.price+itemB.price )
            totalYear.year = year
            totalYear.months = listMontValue

        }

        if (financialByYears.length === 1) {
            const [financialItem] = financialByYears
            totalYear.total = financialItem.price
            totalYear.year = financialItem.year 
            totalYear.months = {month:getMonthTranslate(financialItem.month), total: financialItem.price }

            
        }
        
        return totalYear
       
    })
    return (listValueByYears);
    

    
}

module.exports = {
    getDataJson,
    createOrUpdateDataJson,
    getValuesByDates
}