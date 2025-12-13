const jwt=require('jsonwebtoken')
const authenticateUser=(req,res,next)=>{
    const token=req.headers['authorization']
    if(!token){
        return res.status(401).json({error:'token not provided'})
    }try{
        let tokenData=jwt.verify(token,process.env.JWT_SECRET);
        console.log('token data',tokenData)//token data{userid:'637832827727',iat:12345,exp:12345}
        
        //attach to req object
        req.userId=tokenData.userId;
        req.role=tokenData.role;
        next();
    }catch(err){
        return res.json({error:err.details})
    }
    
}
module.exports=authenticateUser;
