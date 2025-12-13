
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const Category=require('../models/category-model')
const Expenses=require('../models/expence-model')
// const nodemailer = require('nodemailer');
// const transporter=nodemailer.createTransport({
       
//         host:process.env.SMT_HOST,
//         port:process.env.SMT_PORT,
//         secure:true,
//         auth:{
//             user:process.env.EMAIL_USER,
//             pass:process.env.EMAIL_PASS
//         }
//  })

const {userRegisterValidationSchema, userLoginValidationSchema,userPasswordUpdateSchema} = require('../validations/user-validation');
const bcryptjs = require('bcryptjs');

const userCtlr = {};


userCtlr.register = async (req, res) => {
    const body = req.body;
    const { error, value } = userRegisterValidationSchema.validate(body, {abortEarly: false});
    if(error){
        return res.status(400).json({error: error.details});
    }
    try{
        const userByEmail = await User.findOne({email: value.email});
        if(userByEmail){
            return res.status(400).json({error: 'Email already taken'})
        }
        const user = new User(value);
        const salt = await bcryptjs.genSalt();
        const hash = await bcryptjs.hash(user.password, salt);
        user.password = hash;
        const userCount=await User.countDocuments();
        if(userCount==0){
            user.role='Admin';
        }
        await user.save();
    //  res.status(201).json(user);
    // try{
    //     const info=await transporter.sendMail({
    //         from:process.env.EMAIL_USER,
    //         to:user.email,
    //      //   replyTo:user.email,
    //         subject:'welcome!',
    //         html:`<h1>Hello ${user.username}, you're now registered!</h1>`
    //     });
    //     console.log('email sent:',info.response);
    // }catch(mailerr){
    //     console.log('email failed:',mailerr)
    // }
    res.status(201).json({
         message: 'User registered successfully'
        //  userId: user._id     
    });

 }catch(err){
        console.log(err);
        res.status(500).json({error: 'Something went wrong!!'})
    }
}




userCtlr.login = async (req, res) => {
    const body = req.body;
    const {error, value } = userLoginValidationSchema.validate(body, {abortEarlt: false});
    if(error){
        return res.status(400).json({error: error.details})
    }
    const user = await User.findOne({email: value.email});
    if(!user){
        return res.status(401).json({error: 'Invalid email / password'});
    }
    const passwordMatch = await bcryptjs.compare(value.password, user.password);
    if(!passwordMatch){
        await User.findByIdAndUpdate(user._id,{$inc:{errorcount:1}})
        if(user.errorcount>=3){
            return res.status(400).json({error:'failed 3 attempts u cant access your account'})
    }
        return res.status(401).json({error: 'Invalid email / password'})
    }
    if(user.errorcount>=3){
            return res.status(400).json({error:'failed 3 attempts u cant access your account'})
        }
    // user.clickcount+=1
    // await user.save();
    await User.findByIdAndUpdate(user._id,{$inc:{clickcount:1}})
    const tokenData = {userId: user._id,role: user.role};
    console.log(tokenData);
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '7d'});
    res.status(200).json({token: token});
}



userCtlr.account=async(req,res)=>{
    try{
        const user=await User.findById(req.userId);
        res.json(user);
    }catch(err){
        console.log(err);
        res.status(401).json({error:'somthing went wrong'})
    }
  
}

userCtlr.list=async(req,res)=>{
    try{
        if(req.role=="Admin"){
    const userlist=await User.find();
    res.json(userlist);
        }

    }catch(err){
        res.json({error:'somthing went wrong'})
    }
}

userCtlr.update=async(req,res)=>{
const {currentpassword,newpassword}=req.body
const {error}=userPasswordUpdateSchema.validate(req.body)
if(error){
    return res.json({error:error.details})
}
//console.log(currentpassword)
//console.log(newpassword)
if(currentpassword===newpassword){
    return res.json({error:'password same with currentpassword give new password'})
}
try{
    const user=await User.findById(req.userId)
    if(!user){
        return res.status(404).json({error:'user not found'})
    }
   // console.log(user.password,'user pass')
    const matchpassword=await bcryptjs.compare(currentpassword,user.password);
    if(!matchpassword){
        return res.status(400).json({error:'invalid password'})
    }
    const salt=await bcryptjs.genSalt();
    const hash=await bcryptjs.hash(newpassword,salt);
    user.password=hash;
    await user.save();
    res.json({message:'password updated successfully'})
}catch(err){
    console.log(err);
    res.status(500).json({error:'somthing went wrong'})
}
}


userCtlr.remove=async(req,res)=>{
    const id =req.params.id;
    try{
     if(req.role=='Admin'){
     const user= await User.findByIdAndDelete(id);
    //  await Category.deleteMany({user:id})
    //  await Expenses.deleteMany({user:id})
     res.json(user)
        }

    }catch(err){
        console.log(err);
        res.json({error:'somthing went wrong'})
    }
}


module.exports = userCtlr;