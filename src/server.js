const express = require('express')
const app = express()
const routes = require("./routes/index.routes")
const swageer =  require('swagger-ui-express')
const swageerJson = require('./swagger.json')

const _port = 3001

app.use(express.json())
app.use(routes)
app.use('/api-docs', swageer.serve, swageer.setup(swageerJson));


app.listen(_port,()=>console.log('Api iniciada'))