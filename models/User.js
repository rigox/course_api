const mongoose =  require("mongoose")
const Schema =  mongoose.Schema  

const userSchema =  new Schema({
       
    name:{
         type:String,
         required:[true,'please add a  name']
    },
    email:{
        type:String,
        required:[true,'please add and email'],
        unique:true,
        match:[
         /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
         'please add a valid email'                   ]
   },
   role:{
        type:String,
        enum:['user','publisher'],
        default:'user'
   },
   password:{
        type:String,
        required:[true,'please add password'],
        minlength:6,
        select:false
    },
   resetPasswordToken:String,
   resetPasswordExpire:Date,
   createdAt:{
          type:Date,
          default:Date.now

        }
});


module.exports =  mongoose.model('users',userSchema)