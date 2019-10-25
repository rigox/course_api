const dotenv  =  require("dotenv")
const express =   require("express")
const morgan  = require("morgan")
const cors =  require("cors")
const colors =  require("colors")
const errorHandler =  require("./middleware/error")
const app =  express()


//load env vars
dotenv.config({path:'./config/config.env'});


//load routes
const bootcamps  =  require('./routes/bootcamp')

//connect to DB
const connectDB =  require("./config/db")
connectDB()


//setyp bodyparser
app.use(express.urlencoded({extended:true}), express.json())


//for loggin middleware
if(process.env.NODE_ENV === "development"){
     app.use(morgan())
}



//setup routes
app.use('/api/v1/bootcamps',bootcamps)
//setup middleware
app.use(cors())
app.use(errorHandler)






const PORT  =  process.env.PORT || 5000;

app.get('/',(req,res)=>{
   res.send("hello dude")    
})

const server = app.listen(PORT,()=>{
     console.log(`server running on ${process.env.NODE_ENV}  mode on port ${PORT}`.yellow.bold);
});

// Handle unhandled rejections
process.on('unhandledRejections',(err,promise)=>{
  console.log(`Error: ${err.message}`.red)
  //close server and exist process
  server.close(()=> process.exit(1))

});