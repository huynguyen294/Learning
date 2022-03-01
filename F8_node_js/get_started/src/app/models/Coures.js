const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Course = new Schema({
    name: String,
    description: String,
    image: String,
    slug: { type: String, slug: 'name', unique: true},//sử dụng thư viện để chuyển name thành slug, unique: true không cho phép có 2 slug
    level: String,
    videoId: String,
    /* createdAt: {type: Date, default:Date.now},//thời gian được tạo
    updateAt: {type: Date, default: Date.now},//thời gian update */
}, {
    timestamps: true,// Tự động tạo  createdAt,updateAt
})

// plugin soft delete vào schema Course
mongoose.plugin(slug)
//plugin (gắn vào, thêm vào) slug vào thư viện mongoose
Course.plugin(mongooseDelete, { 
    overrideMethods: true, 
    deleteAt: true,
})
module.exports = mongoose.model('Course', Course)