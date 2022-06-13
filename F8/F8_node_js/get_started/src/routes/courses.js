const express = require('express')
const router = express.Router()

const CourseController = require('../app/controllers/CourseController')

router.get('/create', CourseController.create)
router.get('/edit', CourseController.edit)
router.put('/edit', CourseController.update)
router.delete('/delete', CourseController.delete)
router.patch('/restore', CourseController.restore)
router.delete('/force', CourseController.forceDelete)
router.post('/store', CourseController.store)
router.get('/:slug', CourseController.showDetails)

module.exports = router
