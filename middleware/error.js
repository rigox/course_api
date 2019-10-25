const ErrorResponse = require('../utils/errorResponse')

const errorHandler  = (err,req,res,next) =>{
        //Log to console for the developer
        console.log(err.stack.red);
        let error   = {...err}
        error.message =  err.message

        if(err.name === 'CastError'){
             const message  = `Resource not found with the id of ${err.value}`;
             error  =  new ErrorResponse(message,404)
        }

        //mongoose duplicate key
        //400 bad request
        if(err.code === 11000){
             const message = 'Duplicate field value enter' ; 
            error = new ErrorResponse(message , 400)
            }
         //mongoose validation error
         if(err.name === "validationErorr"){
              const message  =  Object.values(err.errors).map(val => val.message);
              error = new ErrorResponse(message  , 400)
         }   

        res.status(error.statusCode || 500).json({
                success:false,
                error:error.message || 'Server Error'
        });
}


module.exports =  errorHandler;