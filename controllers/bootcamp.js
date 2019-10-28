const ErrorResponse =  require("../utils/errorResponse");
const asyncHandler =  require("../middleware/async");
const geocoder =  require("../utils/geocoder");
const Bootcamp =  require("../models/Bootcamp");


// @desc get all bootcamps
//@route  GET /api/v1/bootcamps
//@access  Public
exports.getBootcamps = asyncHandler( async (req,res,next)  => {
     let query;

     // copy req.query

     const reqQuery  ={...req.query}
    
    //fields to exclude 
    const removeFields  = ['select','sort','page','limit']

    //Loop over removeFields and delete them  from reqQuery
    removeFields.forEach(param =>{
        delete reqQuery[param]    
    })

    // create query string
     let queryStr = JSON.stringify(reqQuery)
    
    //Create operators ($gt , $gte, etc )
     queryStr   =  queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    //finding a  resource
    query  =  Bootcamp.find(JSON.parse(queryStr));


    //Select Fields
    if(req.query.select){
        const fields =  req.query.select.split(',').join(' ');
        query =  query.select(fields)
    
    }
    
    //Sort
    if(req.query.sort){
         const sortBy =  req.query.sort.split(',').join(' ');
         query =  query.sort(sortBy)
    }else{
         query = query.sort('-createdAt')
    }

    //Pagination
    const page = parseInt(req.query.page,10) || 1;
    const limit =  parseInt(req.query.limit,10) || 25;
    const startIndex  = (page -1) * limit;
    const endIndex  =  page * limit;
    const total  =  await Bootcamp.countDocuments()
    query =  query.skip(startIndex).limit(limit)



   const bootcamps  =  await  query
    
   //Pagination Result
   const pagination = {};
   if(endIndex < total){
        pagination.next={
             page:page+1,
             limit
        }
   }

   if(startIndex > 0 ){
        pagination.prev = {
              page: page-1,
              limit
        }
   }

 res.status(200).json({
             success:true,
             pagination,
             count:bootcamps.length,
             data : bootcamps
        })
    

})

//@desc get single bootcamps
//@route  GET /api/v1/bootcamps/:id
//@access  Public
exports.getBootcamp =  asyncHandler (async (req,res,next)  => {

        const bootcamp =  await  Bootcamp.findById(req.params.id)
        res.status(200).json({
             success:true,
             data:bootcamp
        })
        if(!bootcamp){
                return next( 
                     new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404)
                ) 
        }

    

});

// @desc  create a bootcamp
//@route  PORST /api/v1/bootcamps
//@access  Private
exports.createBootcamp =  asyncHandler( async (req,res,next)  => {

    const bootcamp = await Bootcamp.create(req.body)

    res.status(201).json({
          success:true,
          data:bootcamp
    })


});

//@desc  Update bootcamp
//@route  PUT /api/v1/bootcamps/:id
//@access  private
exports.updateBootcamp = asyncHandler( async (req,res,next)  => {
  
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
           });
             if(!bootcamp){
                return new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`,404);
            }
          
          res.status(200).json({
                success:true,
                data:bootcamp
          })

});


//@desc delete one bootcamps
//@route  DELETE /api/v1/bootcamps/:id
//@access  Private
exports.deleteBootcamp =  asyncHandler( async(req,res,next)  =>{
         const bootcamp =  await   Bootcamp.findByIdAndDelete(req.params.id)
        
         if(!bootcamp){
              return res.status(400).json({success:false})
         }

         res.status(200).json({
               success:true,
               data:bootcamp
         });


});

//@desc  Get  bootcamps within a radius
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access Pricvate
exports.getBootcampsInRadius =  asyncHandler(async (req,res,next)=>{
 const  {zipcode,distance} =  req.params;

 //get lat/lng from geocoder
const loc =  await geocoder.geocode(zipcode);
const lat =  loc[0].latitude;
const lng =  loc[0].longitude;

//calculate radius using radians
//divide dis by radius of earth
//earth radiius   = 3,693mi / 6,378km

const  radius =  distance / 3963;
const bootcamps  = await  Bootcamp.find({
    location:{$geoWithin:{$centerSphere:[[lng,lat],radius]}}
});

res.status(200).json({
     success:true,
     count:bootcamps.length,
     data:bootcamps
})

});

