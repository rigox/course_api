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

//static method to get average of course tuiton

courseSchema.statics.averageCost = async function(bootcampId){

  const obj  =  await this.aggregate([
       {
            $match:{bootcamp:bootcampId}
       },
       {
            $group:{
                 _id:'$bootcamp',
                 averageCost:{$avg:'$tuition'}
            }
            
       }

  ]);

  try {
      await  this.model('Bootcamp').findByIdAndUpdate(bootcampId,{
         averageCost:Math.ceil(obj[0].averageCost   /10) *10
      })

  } catch (err) {
        console.log(err)
  }
};

//Call getAverageCost after save
courseSchema.post('save',function(){
  this.constructor.averageCost(this.bootcamp)
});
//Call getAverageCost before remove
courseSchema.pre('remove',function(){
     this.constructor.averageCost(this.bootcamp)

});

module.exports =  mongoose.model('Course',courseSchema);