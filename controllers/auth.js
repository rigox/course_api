const  ErrorResponse =  require("../utils/errorResponse")
const asyncHandler =  require("../middleware/async")
const  geocoder =  require("../utils/geocoder")
const Bootcamp  =  require("../models/Bootcamp")
const User =  require("../models/User");


//@desc Register user
//@route get /api/v1/auth/register
//@Access Private
exports.register  = asyncHandler(async (req,res,next)=>{
   
     const  {name, email, password ,  role} = req.body;
     
     //Create user
     const user =  await User.create({
          name,
          email,
          password,
          role
     });

     //create token
     const token =  user.getSignedJwtToken();


     res.status(200).json({
          success:true,
          token
     });

});


//@desc Login user
//@route get /api/v1/auth/login
//@Access public
exports.login =  asyncHandler(async (req,res,next)=>{
      const {email,password} =  req.body;
      //validate Email
      if(!email || !password){
            return next( new ErrorResponse('please provide and email password and password'),400)
      }
      const user =  await User.findOne({email:email}).select('+password');
       
      if(!user){
           return  next(new ErrorResponse('Invalid credintials'),401);
      }

     // check if password matches 
      const  isMatch =  await user.matchPassword(password);
     
      if(!isMatch){
        return  next(new ErrorResponse('Invalid credintials'),401);
      }

       sendTokenResponse(user,200,res); 
    });

//get token from model  create cookie and send response  
const sendTokenResponse  = (user,statusCode,res) => {
    // Create token 
    const token  = user.getSignedJwtToken();
    const options = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 *60 *60*1000),
            httpOnly:true
    }
    if(process.env.NODE_ENV === 'production'){
         options.secure =  true
    }
    res.status(statusCode)
    .cookie('token',token,options)
    .json({
         success:true,
         token
    })
};

//@desc Get current Loggedin user
//@route POST /api/v1/auth/me
//@access Private
exports.getMe = asyncHandler(async (req,res,next)=>{
       const user =  await User.findById(req.user.id) 
       res.status(200) .json({
            sucess:true,
            data:user
       });
});