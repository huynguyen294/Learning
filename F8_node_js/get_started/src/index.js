const express = require('express')
const { engine } = require('express-handlebars');
const morgan = require('morgan')
const path = require('path')
const app = express()
const port = 3000

//config static file (img, css, js)
app.use(express.static(path.join(__dirname, 'public')))

//HTTP logger
app.use(morgan('combined'))

//template engine
app.engine('hbs', engine({
    extname: 'hbs',
}))
app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'hbs')

//app middleware
app.get('/', (req, res) => {
    return res.render('home', {title: 'Homepage'})
})

//port lister
app.listen(port, console.log(`Example app listening at http://localhost:${port}/`))