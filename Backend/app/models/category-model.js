const mongoose=require('mongoose')
const categorySchema=new mongoose.Schema({
    name:String,
    user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'

    }

},{timestamps:true});
const Category=mongoose.model('Category',categorySchema);
module.exports=Category;
//ref: 'User': enables Mongoose’s populate feature, 
//      linking this ObjectId to a document in the User model