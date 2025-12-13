const Expense=require('../models/expence-model');
const ExpenseSchema = require('../validations/expense-validation');
const expenseValidationSchema=require('../validations/expense-validation')
const expenseCtrl={};
const category=require("../models/category-model")
expenseCtrl.create=async(req,res)=>{
    const body=req.body;
    const{error,value}=expenseValidationSchema.validate(body);
    if(error){
        return res.status(400).json({error:error.details})
    }
    try{
        // const category=await Expense.findOne({category:value.category,user:req.userId})
        // if(category){
        //     return res.status(400).json({error:'category already taken'})
        // }
        const expense=new Expense(value);
        expense.user=req.userId;
        await expense.save();
        // const expensePopulate=await Expense.findById(expense._id).populate('category',['_id','name'])
        res.json(expense);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'somthing went wrong'})
    }
}
expenseCtrl.update=async(req,res)=>{
    const body=req.body;
    const id=req.params.id;
    const {error,value}=ExpenseSchema.validate(body);
    if(error){
        return res.status(400).json({error:error.details});
    }
    try{
        const expense=await Expense.findOneAndUpdate({_id:id,user:req.userId},value,{new:true})
        if(!expense){
            return res.status(400).json({error:'record not found'})
        }
        res.json(expense);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'somthing went wrong'})
    }
}
expenseCtrl.remove=async(req,res)=>{
        const id=req.params.id;
        try{
          
          const expense =await Expense.findOneAndDelete({_id:id,user:req.userId},{new:true})
         if(!expense){
            return res.status(400).json({error:'record not found'})
         }
          res.json({expense:expense,
                    message:'successfully deleted'})
        }catch(err){
            console.log(err);
            res.status(500).json({error:'somthing went wrong'})
        }


}
expenseCtrl.list=async(req,res)=>{
    try{
        // const expense=await Expense.find({user:req.userId});
        // if(!expense){
        //     res.status(404).json({error:'record not found'})
        // }
        // res.json(expense)
        let expenses;
        if(req.role=='admin'){
            expenses=await Expense.find();
        }else{
            expenses=await Expense.findOne({user:req.userId})
            // .populate('category',["_id","name"])
        }
        res.json(expenses);
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}
expenseCtrl.show=async(req,res)=>{
    const id=req.params.id;
    try{
        const expense=await Expense.findOne({_id:id,user:req.userId});
        if(!expense){
            res.status(404).json({error:'record not found'})
        }
        res.json(expense)
    }catch(err){
        res.status(500).json({error:'somthing went wrong'})
    }
}

module.exports=expenseCtrl;