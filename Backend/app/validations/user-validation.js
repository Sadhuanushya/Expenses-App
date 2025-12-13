const Joi = require('joi');
const userRegisterValidationSchema = Joi.object({
    username: Joi.string().trim().required().min(4).max(64),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required().min(8).max(128)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$'))
    .message('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.')
})
// (?=.*[a-z]) → at least one lowercase

// (?=.*[A-Z]) → at least one uppercase

// (?=.*\\d) → at least one digit

// (?=.*[@$!%*?&#]) → at least one special character

// [A-Za-z\\d@$!%*?&#]{8,} → allows only these characters, and at least 8 total
// The ^ at the beginning means: the pattern must start matching from the beginning of the string

// The $ at the end means: the pattern must also end at the end of the string
const userLoginValidationSchema = Joi.object({
    email: Joi.string().trim().email().required().min(8).max(128),
    password: Joi.string().trim().required().min(8).max(128)
})
const userPasswordUpdateSchema=Joi.object({
    currentpassword:Joi.string().required(),
    newpassword:Joi.string().min(8).max(128).required()
})

module.exports = {
    userRegisterValidationSchema,
    userLoginValidationSchema,
    userPasswordUpdateSchema
};