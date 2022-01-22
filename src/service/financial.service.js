const { getDataJson } = require("../utils/funtions");

module.exports = {
  async getFinancial(id) {
    try {
        const financialData = getDataJson("financial");
        const findFinancialData = financialData.find((financialItem) => financialItem.userId == id);
        const indexFinancial = financialData.indexOf(findFinancialData)
        console.log(indexFinancial,'service');
        
        if (!findFinancialData)
         throw new Error("Usuario não possui valores!")

         return {findFinancialData,indexFinancial}

    } catch (error) {
        return {error: error.message}
    }
   
}
}