// @desc get all bootcamps
//@route  GET /api/v1/bootcamps
//@access  Public
exports.getBootcamps =  (req,res,next)  => {
      
    res.status(200).json({success:true, msg:"show all bootcamps"})

}

//@desc get single bootcamps
//@route  GET /api/v1/bootcamps/:id
//@access  Public
exports.getBootcamp =  (req,res,next)  => {
      
    res.status(200).json({success:true, msg:"show  one bootcamp"})

}

// @desc  create a bootcamp
//@route  PORST /api/v1/bootcamps
//@access  Private
exports.createBootcamp =  (req,res,next)  => {
    res.status(200).json({success:true, msg:"creates one bootcamp"})
}

//@desc  Update bootcamp
//@route  PUT /api/v1/bootcamps/:id
//@access  private
exports.updateBootcamp =  (req,res,next)  => {
      
    res.status(200).json({success:true, msg:"updated one bootcamps"})

}


//@desc delete one bootcamps
//@route  DELETE /api/v1/bootcamps/:id
//@access  Private
exports.deleteBootcamp =  (req,res,next)  =>{
    res.status(200).json({success:true, msg:"deleted one bootcamps"})
}