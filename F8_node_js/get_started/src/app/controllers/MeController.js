const Course = require('../models/Coures')
const { multipleMongooseToObject } = require('../../services/mongooes')

class MeController {

    // [GET] /me/store/courses
    storeCourse(req, res, next){

        //sử dụng promise.all để đồng bộ 2 promise
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    title: "My course",
                    courses: multipleMongooseToObject(courses),
                    deletedCount
                })
            })

        /* //lấy số phần tử đã bị cho vào thùng rác
        Course.countDocumentsDeleted()
            .then(deletedCount => {
                console.log(deletedCount)
            })
            .catch(e => console.log(e))
        //lấy danh sách khóa học
        Course.find({})
            .then(courses => {
                res.render('me/stored-courses', {
                    title: "My course",
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch(e => console.log(e)) */
    }

    // [GET] /me/trash/courses
    trashCourse(req, res, next){
        Course.findDeleted({})
            .then(courses => {
                res.render('me/trash-courses', {
                    title: "My trash",
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch(e => console.log(e))
    }

    profile(req, res, next){
        res.send('me/profile')
    }

}

module.exports = new MeController