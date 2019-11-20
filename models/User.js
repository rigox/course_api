const mongoose =  require("mongoose")
const Schema =  mongoose.Schema  
const bcrypt = require("bcryptjs")
const jwt  =  require("jsonwebtoken")


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

// Encrypt Password using bcrypt
userSchema.pre('save' , async function(next){
     const   salt =  await bcrypt.genSalt(10);
     this.password =   await  bcrypt.hash(this.password, salt);

});

//Sign JWT and return
userSchema.methods.getSignedJwtToken  = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
}

//Match user entered password to hashed password in  database
userSchema.methods.matchPassword = async function(enteredPassword){
      return bcrypt.compare(enteredPassword, this.password)
};


module.exports =  mongoose.model('users',userSchema)