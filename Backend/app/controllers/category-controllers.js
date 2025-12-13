const Category=require('../models/category-model')
const categoryValidationSchema=require('../validations/category-validations');
categoryctrl={};
categoryctrl.create=async(req,res)=>{
    const body=req.body;
    const{error,value}=categoryValidationSchema.validate(body,{abortEarly:false})
    if(error){
        res.status(400).json({error:error.details})
    }
    try{
        const categoryInDB=await Category.findOne({name:value.name,user:req.userId})
        if(categoryInDB){
            return res.status(400).json({error:'category already taken'})
        }
        const category=new Category(value);
        category.user=req.userId;
        await category.save();
        res.json(category);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'somthing went wrong'})
    }
}

categoryctrl.list=async(req,res)=>{
    try{
        if(req.role=="admin"){
            const categories=await Category.find()
            return res.json(categories)
        }
        const categories=await Category.find({user:req.userId});
        res.json(categories);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'somthing went wrong'})
    }
}
categoryctrl.delete=async(req,res)=>{
    const id=req.params.id;
    try{
        const category=await Category.findOneAndDelete({_id:id,user:req.userId});
        if(!category){
            return res.status(404).json({error:'record not found'});
        }
        res.json(category);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'somthing went wrong'})
    }
}
categoryctrl.update=async(req,res)=>{
    const id=req.params.id;
    const body=req.body
   const{error,value}=categoryValidationSchema.validate(body);
   if(error){
    return res.status(400).json({error:error.details});
   }
    try{
        const category=await Category.findOneAndUpdate({_id:id,user:req.userId},value,{new:true});
        if(!category){
            return res.status(404).json({error:'record not found'});
        }
        res.json(category);
    }catch(err){
        res.json('somthing went wrong')
    }
}
module.exports=categoryctrl;
