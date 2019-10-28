const mongoose =  require("mongoose")
const Schema =  mongoose.Schema

const courseSchema =  new  Schema({
  title:{
       type:String,
       trim:true,
       required:[true,'Please add a course title']
  },
  description:{
        type:String,
        required:[true,'please add a desccription']
  },
  weeks:{
       type:String,
       required:[true,'please add number of weeks']
  },
  tuition:{
      type:Number,
      required:[true,'please add a tuition cost']
  },
  minimumSkill:{
        type:String,
        requied:[true,'please add a description'],
        enum:['beginner','intermediate','advanced']
  },
  scholarshipAvailable:{
       type:Boolean,
       default:false
  },
  createdAt:{
        type:Date,
        default:Date.now
  },
  bootcamp:{
       type: mongoose.Schema.ObjectId,
       ref:'Bootcamp',
       required:true
  }
});

module.exports =  mongoose.model('Course',courseSchema);