const mongoose=require('mongoose');
const expenseSchema=new mongoose.Schema({
    ExpenseDate: Date,
    title:String,
    amount:Number,
    category:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Category'
    },
    description:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})
const Expense=mongoose.model('Expense',expenseSchema);
module.exports=Expense;