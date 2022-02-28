const Course = require('../models/Coures')
const { mongooseToObject } = require('../../services/mongooes')

class CourseController {

    //[GET] /courses/:slug
    showDetails(req, res, next){
        /* console.log(req.params.slug)
        Course.findOne({}, course=>{
            res.json(course)
        }) */
        Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render('showDetails', {
                    title: req.params.slug + " course",
                    course: mongooseToObject(course),
                })
            })
            .catch(next)
    }

    //[GET] /courses/create
    Create(req, res, next){
        res.render('create')
    }

    //[POST] /courses/store
    Store(req, res, next){
        const formData = req.body
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        new Course(formData).save()
            .then(() => res.redirect('/'))
            .catch(e => console.log(e))
    }
}

module.exports = new CourseController