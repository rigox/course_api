const dotenv  =  require("dotenv")
const express =   require("express")
const app =  express()

//load routes
const bootcamps  =  require('./routes/bootcamp')

//load env vars
dotenv.config({path:'./config/config.env'});

const logger  = (req,res,next) =>{
     req.hello  = 'world!'
     next();
    }

//setup middleware
app.use(express.urlencoded({extended:true}), express.json())
app.use(logger)

//setup routes
app.use('/api/v1/bootcamps',bootcamps)

const PORT  =  process.env.PORT || 5000;

app.get('/',(req,res)=>{
   res.send("hello dude")    
})

app.listen(PORT,()=>{
     console.log(`server running on ${process.env.NODE_ENV}  mode on port ${PORT}`);
});