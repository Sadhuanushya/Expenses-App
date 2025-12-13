const Joi=require('joi');
const categoryValidationSchema=Joi.object({
    name:Joi.string().required()
})
module.exports=categoryValidationSchema;