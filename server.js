const dotenv  =  require("dotenv")
const express =   require("express")
const app =  express()

//load env vars

dotenv.config({path:'./config/config.env'});

//setup middleware
app.use(express.urlencoded({extended:true}), express.json())


const PORT  =  process.env.PORT || 5000;


app.listen(PORT,()=>{
     console.log(`server running on ${process.env.NODE_ENV}  mode on port ${PORT}`);
});