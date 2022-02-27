//Course là schema của mongoose
const Course = require('../models/Coures')
const { multipleMongooseToObject } = require('../../services/mongooes')

class SiteController {

    //[GET] /
    index(req, res, next){

        //các lấy dữ liệu từ databáe bằng mongoose bằng hàm find()
        /* Course.find({}, (err, courses) => {
            if(!err) {
                res.json(courses)
            }else{
                res.status(400).json({error: 'ERROR!!!'})
            }
        }) */

        //cách fetch api bằng promise
        Course.find({})
            .then(courses => {
                res.render('home', {
                    title: 'Home',
                    courses: multipleMongooseToObject(courses),
                    /* courses, //cách viết nhanh courses */
                })
            })
            .catch(next)  // cách viêt này tắt của e => next(e)

        //res.render('home', {title: 'Homepage'})
    }

    //[GET] /search
    search(req, res){
        res.send('search')
    }
}

module.exports = new SiteController