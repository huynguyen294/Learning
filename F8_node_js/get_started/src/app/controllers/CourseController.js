const Course = require('../models/Coures')
const { mongooseToObject, multipleMongooseToObject } = require('../../services/mongooes')

class CourseController {

    //[GET] /courses/:slug
    showDetails(req, res, next){
        /* console.log(req.params.slug)
        Course.findOne({}, course=>{
            res.json(course)
        }) */
        Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render('courses/showDetails', {
                    title: req.params.slug + " course",
                    course: mongooseToObject(course),
                })
            })
            .catch(next)
    }

    //[GET] /courses/create
    create(req, res, next){
        res.render('courses/create')
    }

    //[GET] /courses/create?id
    edit(req, res, next){
        Course.findById(req.query.id)
            .then(course => {
                res.render('courses/edit', {
                    title: 'Edit course',
                    course: mongooseToObject(course)
                })
            })
            .catch(e => console.log(e))
    }

    //[PUT] /course/edit?id
    update(req, res, next){
        Course.updateOne({_id: req.query.id}, req.body)
            .then(course => {
                res.redirect('/me/stored/courses')
            })
            .catch(e => console.log(e))
    }

    //[DELETE] /courses/delete?id
    delete(req, res, next){
        Course.delete({_id: req.query.id})
            //quay lại trang trước đó /courses/delete?id => me/stored/courses
            .then(()=>{res.redirect('back')})
            .catch(e => console.log(e))
    }

    //[DELETE] /courses/force
    forceDelete(req, res, next){
        Course.deleteOne({_id: req.query.id})
            //quay lại trang trước đó /courses/delete?id => me/stored/courses
            .then(()=>{res.redirect('back')})
            .catch(e => console.log(e))
    }

    //[PATCH] /courses/restore?id
    restore(req, res, next){
        Course.restore({ _id: req.query.id })
            .then(() => {
                {res.redirect('back')}
            })
            .catch(e => console.log(e))
    }

    //[POST] /courses/store
    store(req, res, next){
        //clone obj vì trong js thì obj là kiểu tham trị
        const formData = {...req.body}
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        new Course(formData).save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(e => console.log(e))
    }
}

module.exports = new CourseController