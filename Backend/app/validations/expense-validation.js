const Joi=require('joi');
const ExpenseSchema=Joi.object({
    ExpenseDate:Joi.date().required().less(new Date()),
    title:Joi.string().required(),
    amount:Joi.number().min(1).required(),
    category:Joi.string().required(),
    description:Joi.string()
 
})
module.exports=ExpenseSchema;