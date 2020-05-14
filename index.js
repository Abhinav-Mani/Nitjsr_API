const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT||800;

const express= require("express");
const app = express();
const userRoute = require("./Route/Users");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user",userRoute);

app.listen(PORT,()=>{
    if(!process.env.PORT){
        console.log("Your .env file is not configured")
    }
    console.log(`Listening at port ${PORT}` );
})