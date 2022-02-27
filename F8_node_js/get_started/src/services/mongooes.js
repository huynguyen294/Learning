//convert mongoose Obj to Obj vì dữ liệu được lấy từ db qua 
//mongoose obj được gọi là các document của mongoose db nên obj 
//này không cho phép lấy các thuộc tính ra trực tiếp vì tính bảo 
//mật, vì vậy mongoose cung cấp phương thức toObject để chuyển
//nó về dạng Obj thông thường để xử lí
module.exports = {
    multipleMongooseToObject: (mongooseArray) => mongooseArray.map(el => el.toObject()),
    mongooseToObject: (mongooseObj => mongooseObj ? mongooseObj.toObject() : mongooseObj)
}