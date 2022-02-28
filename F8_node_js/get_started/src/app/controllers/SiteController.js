//Course là schema của mongoose
const Course = require('../models/Coures')
const { multipleMongooseToObject } = require('../../services/mongooes')

class SiteController {

    //[GET] /
    index(req, res, next){

        //crate: sample data
        /* const sampleData = [
            {
                image: "https://files.fullstack.edu.vn/f8-prod/courses/1.png",
                name: "JavaScript Cơ Bản",
                description: "Học Javascript cơ bản phù hợp cho người chưa từng học lập trình. Với hơn 100 bài học và có bài tập thực hành sau mỗi bài học.",
                slug: "javascript-co-ban",
            },
            {
                image: "https://files.fullstack.edu.vn/f8-prod/courses/12.png",
                name: "JavaScript Nâng Cao",
                description: "Hiểu sâu hơn về cách Javascript hoạt động, tìm hiểu về IIFE, closure, reference types, this keyword, bind, call, apply, prototype, ...",
                slug: "javascript-nang-cao",
            },
            {
                image: "https://files.fullstack.edu.vn/f8-prod/courses/13/13.png",
                name: "Xây Dựng Website với ReactJS",
                description: "Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm hầu hết các dự án thường gặp với ReactJS. Cuối khóa học này bạn sẽ sở hữu một dự án giống Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các kiến thức được chia sẻ trong khóa học này.",
                slug: "reactjs",
            },
            {
                image: "https://files.fullstack.edu.vn/f8-prod/courses/2.png",
                name: "HTML, CSS từ Zero đến Hero",
                description: "Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee.",
                slug: "html-css",
            }
        ] */
        //add sample data to db
        /* sampleData.forEach(data => {
            new Course(data).save()
        }) */

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