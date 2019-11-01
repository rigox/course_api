const  ErrorResponse =  require("../utils/errorResponse")
const asyncHandler =  require("../middleware/async")
const  geocoder =  require("../utils/geocoder")
const Bootcamp  =  require("../models/Bootcamp")



//@desc Register user
//@route get /api/v1/auth/register
//@Access Private
exports.register  = asyncHandler(async (req,res,next)=>{
     res.status(200).json({success:true})

});

