const pool = require("../Util/datbase");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");

let salRounds=Number(process.env.SALT_ROUND);

module.exports.ADD_TEACHER=(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    if(!username||!password){
        res.status(400);
        res.json({error:"Missing Parameter"});
    }
    bcryptjs.hash(password,salRounds).then(hash=>{
        createTeacher(hash);
    }).catch(err=>{
        res.json({error:"Internal Server Error"}).status(500);
    });
    async function createTeacher(hash){
        try{
            await pool.query("insert into users values (?,?,?)",[username,hash,"Teacher"]);
            res.json({}).status(201);
        }catch(err){
            res.status(500);
        }
    }
}

module.exports.SIGN_IN=(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    if(!username||!password){
        res.status(400);
        res.json({error:"Missing Parameter"});
    }
    signIn();
    async function signIn(){
        try{
            const [result,extra] = await pool.query("SELECT * FROM users WHERE UID = (?)",[username]);
            if(result.length===0){
                res.status(401);
                res.json({error:"Username or Password is Wrong"});
            }

            let hashPassword = result[0].Password;

            let bool= await bcryptjs.compare(password,hashPassword);
            if(bool){
                res.status(200);
                let accessToken=jwt.sign({
                    user:username,
                    post:result[0].Authority
                },
                    process.env.ACCESS_TOKEN_SECRET
                );
                res.json({accessToken:accessToken});
            }else{
                res.status(401);
                res.json({error:"Username or Password is Wrong"});
            }
        }catch(err){
            res.status(500);
            res.send({error:err});
        }
    }   
}