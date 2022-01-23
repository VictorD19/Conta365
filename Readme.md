#  :moneybag: Conta365 - Registro Financiero
Conta365 é uma Api que poderá usar para registrar e ter controle da suas finanças mensais e anual, 

## Intalação
1-Primeiramente precisa fazer um clone do projeto.
~~~
git clone https://github.com/VictorD19/Conta365.git
~~~
3-Depois é só iniciar a Api com o seguinte comando ``npm start``

a api esta rodando no http://localhost:3001/api-docs/ onde poderá fazer teste interagindo com a interface grafica do swagger.

### Endpoints usuario

|Metodo| Endpoints  | Descripção |Enviar|
|--|--|--|--|
|Get|/v1/user/:id | Obtém a informação do usuário através do id|
|Post|/v1/create-user|Utilizado para criar um novo usuario deve ser enviado um Json|{"id": 10, "name":"Pedro", "email": " pedro1234@gmail.com " }|
|Patch |/v1/update-user/:id |Atualiza as informações do usuario, só pode ser atualizado o name e o email|{"name":"Novo nome", "email": " NovoEmail " }|

### Endpoints financiero
|Metodo| Endpoints  | Descripção |Enviar|
|--|--|--|--|
|Get|/v1/finance-total/:userId| Obtém o total de valores registrados por mes/ano, podendo filtral tambem pela query typesOfExpenses (tipo de gastos) |
|Delete|/v1/finance/:userId/:financialId| Podera deletar um registro financiero, passando o ``userID`` e o ``finacialId``||
|Post|/v1/finance/:userId |Aqui podera enviar uma planinha excel, com todos os registro. Obs: É impotante que a planilha tenha os seguintes nomes de colunas nessta orden **price**,**typesOfExpenses**,**date** e **name** para funcionar correctamente |Arquivo .xlsx |


### Descripção
Este é um projecto desenvolvido para o DevinHouse,,que é um curso oferecido pelo senai que prepara desenvolvedores por 9meses, para que ao final dele estejam pronto pro mercado de Trabalho.