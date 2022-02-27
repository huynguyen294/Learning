const express = require('express')
const router = express.Router()

const newsController = require('../app/controllers/NewController')

router.use('/:slug', newsController.show)

//newsController.index
router.use('/', newsController.index) //phuongw thức index để được tạo ở class NewsController

module.exports = router