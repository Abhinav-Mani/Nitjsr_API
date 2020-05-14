const jwt=require("jsonwebtoken");

module.exports.IS_AUTHENTICATED = (req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    
    if(token==null){
        return res.sendStatus(401);
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(401);
        req.user=user;
        next();
    });

}

module.exports.IS_ADMIN=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    
    if(token==null){
        return res.sendStatus(401);
    }
    const decoded=jwt.decode(token);
    if(decoded.post==="Admin"){
        next();
    }else{
        return res.sendStatus(403);
    }
}