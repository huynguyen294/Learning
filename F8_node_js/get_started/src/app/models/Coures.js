const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Course = new Schema({
    
    name: {type:String, maxlength:255},
    description: {type:String, maxlength:600},
    image: {type:String, maxlength: 255},
    createdAt: {type: Date, default:Date.now},//thời gian được tạo
    updateAt: {type: Date, default: Date.now},//thời gian update
    
})

module.exports = mongoose.model('Course', Course)