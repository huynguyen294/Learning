class NewsController {

    //[GET] /news
    index(req, res){
        res.render('news')
    }

    //[GET] /search
    show(req, res){
        res.send('new details!')
    }

}

module.exports = new NewsController