const express = require('express')
const app = express()
const routes = require("./routes/index.routes")
const _port = 3001

app.use(express.json())
app.use(routes)

app.listen(_port,()=>console.log('Api iniciada'))