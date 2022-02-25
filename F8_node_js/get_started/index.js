const express = require('express')
const { compile } = require('morgan')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(morgan('combined'))

app.get('/', (req, res) => {
    var a = 1
    var b = 2
    var c = a + b
    return res.send('hello world')
})

app.listen(port, console.log(`Example app listening at http://localhost:${port}/`))