const {
  getDataJson,
  getValuesByDates,
  createOrUpdateDataJson,
} = require("../utils/funtions");
const xlsxPopulate = require("xlsx-populate");
const financialService = require("../service/financial.service");
const userService = require("../service/user.service");

module.exports = {
  async getTotalFinancialMonthAndYear(req, res) {
    // #swagger.description = 'Retorna o total de valores por mes/ano'

    const { userId } = req.params;
    const { typesOfExpenses } = req.query;

    try {
      const user = await userService.getUser(userId)
     
      if(user.error)
        throw new Error(user.error)
      
      const financial = await financialService.getFinancial(userId)
      if (financial.error) 
         throw new Error(financial.error)
      
      let newListFinancialData = [...financial.findFinancialData.financialData];


      const verifyTypeOfExpenses = Number(typesOfExpenses);

      if (verifyTypeOfExpenses)
        throw new Error("Insira uma typesOfExpenses valido!.")

      if (typesOfExpenses)
        newListFinancialData = newListFinancialData.filter(
          (financialItem) =>
            financialItem.typesOfExpenses.toLowerCase() ===
            typesOfExpenses.toLowerCase()
        );

      const valuesByYears = await getValuesByDates(newListFinancialData);

      return res.status(200).json({ totalPerYear: valuesByYears });

    } catch (error) {
      return res.status(400).json({error: error.message});
    }
  },
  async deleteFinancial(req, res) {
    // #swagger.description = 'Deleta um usuario atravez do id'

    const { userId, financialId } = req.params;
    const newFinancialId = Number(financialId);

    try {
      const user = await userService.getUser(userId)

      if(user.error)
        throw new Error(user.error)

      const financial = await financialService.getFinancial(userId)

      if(financial.error)
        throw new Error(financial.error)
      
      if (!newFinancialId)
        throw new Error(`Formato de id invalido, o financialId precisa ser numero.`)

      const findFinancialRegister = financial.findFinancialData.financialData.find(
        (financialItem) => financialItem.id === newFinancialId
      );

      if (!findFinancialRegister)
        throw new Error(`Nâo existe nenhum registro com este id: ${newFinancialId}`)
      
      const newListFinancial = financial.findFinancialData?.financialData.filter(
          (financialItem) => financialItem.id !== newFinancialId
        );
      
      const financialDataJson = getDataJson("financial");
    
      financial.findFinancialData.financialData = newListFinancial;
      financialDataJson[financial.indexFinancial] = financial.findFinancialData;
      createOrUpdateDataJson("financial", financialDataJson);

      return res.status(200).json({ message: "Registro deletado com successo" })
    } catch (error) {
      return res.status(400).json({error: error.message});
    }

   
  },
  async setFinancialData(req, res) {
    // #swagger.description = 'Registra dados inseridos atravez de um .xlsx'
    /*
          #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['file'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
              description: 'Some description...',
        } */
    const { userId } = req.params;
    const nameFile = req.file.originalname;
    const newUserId = Number(userId);

    try {
      if (!nameFile.includes(".xlsx"))
        throw new Error("Formato de documento invalido. Só é aceitado .xlsx!")
      
      const user = await userService.getUser(userId)
      
      if (user.error) 
        throw new Error(user.error)
      
      const xlsxFinancialData = await xlsxPopulate.fromDataAsync(req.file.buffer);
      const rowsFinancial = xlsxFinancialData.sheet(0).usedRange().value();
      const headRow = rowsFinancial.shift();
      const head = ["price", "typesOfExpenses", "date", "name"];
      const findHeadColum = headRow.filter((colum) => !colum);

      if (findHeadColum && !findHeadColum)
        throw new Error("A(s) columna(s) principal não pode estar vazia!.")
    
      const isEqualRows = head.every((element, index) => element === headRow[index])

      if (!isEqualRows)
        throw new Error("Nome ou ordem de columnas invalidas!. As colunas validas são: price,typesOfExpenses,date,name nesse ordem!.")
      
      const financialDataJson = await getDataJson("financial");
      const financial = await financialService.getFinancial(userId)


      const existFinancialData = financial.error
          ? { id: financialDataJson.length + 1, userId: newUserId, financialData: [] }
          : financial.findFinancialData;

      rowsFinancial.map((columnData) => {
          const newRows = columnData.map((colum, i) => {
            if ([head[i]] == "date") {
                colum = xlsxPopulate.numberToDate(colum);
              }
              return {
                [head[i]]: colum ? colum : "",
              };
            });
      
          const objectFinancial = Object.assign(
              {},
              { id: existFinancialData?.financialData.length + 1 },
              ...newRows
            );
            existFinancialData?.financialData.push(objectFinancial);
          });
          
          console.log(financial);
          
        if (!financial.indexFinancial) {
          financialDataJson.push(existFinancialData);
          
          createOrUpdateDataJson("financial", financialDataJson);
          return res.json({ message: "Registros financieros agregados  com successo" });
        }
        console.log(financialDataJson);

        financialDataJson[financial.indexFinancial] = existFinancialData;
        createOrUpdateDataJson("financial", financialDataJson);
        return res.status(200).json({ message: "Registros financieros agregados  com successo" })
    } catch (error) {
      return res.status(400).json({error: error.message});
    }
  },
};
