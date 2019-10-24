const mongoose =  require("mongoose");

const connectDB  = async ()=>{
   const con = await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:true,useUnifiedTopology:true})
    console.log('MongoDB connected'.cyan.underline.bold)
    }


module.exports =  connectDB;