const mongoose =  require("mongoose")
const slugify =  require("slugify")
const geocoder= require("../utils/geocoder")
const Schema =  mongoose.Schema


const BootcamSchema  = new Schema({
       name:{
             type:String,
             required:[true , 'please add a name'],
             unique:true,
             trim:true,
             maxlength:[50,'name cannot be more than 50 characters']
       },
  slug:String,
  description:{
       type:String,
       required:true,
       maxlength:[500,"Description cannot be more than 500 characters"]
  },
  website:{
        type:String,
        match:[
 /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
 'please use a valid URL with HTTP or HTTPS'

        ]
  },
  phone:{
       type:String,
       maxLength:[20,'Phone  number can not be longer than 20 characthers']
  },
  email:{
       type:String,
       match:[
        /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        'please add a valid email'
                       ]
  },
  address:{
        type:String,
        required:[true,'please add an address']
  },
  location:{
       //GeoJSON Point
    type:{
         type:String,
         enum:['Point'],
         //required:true
    },
    coordinates:{
         type:[Number],
        // required:true,
         index:'2dsphere'
    },
    formatedAddress:String,
    street:String,
    city:String,
    state:String,
    zipcode:String,
    country:String,
  },
  careers:{
     //array of strings
     type:[String],
     required:true,
     enum:[
         'Web Development',
         'Mobile Development',
         'UI/UX',
         'Data Science',
         'Business',
         'Other'
     ]  
  },

  averageRating:{
        type:Number,
        min:[1,'Rating must be at least 1'],
        max:[10,'Rating can not be more than 10'],
  },
  averageCost:Number,
  photo:{
       type:String,
       default:'no-photo.jpg'
  },
  housing:{
       type:Boolean,
       default:false
  },
  jobAssistance:{
    type:Boolean,
    default:false
},
jobGuarantee:{
    type:Boolean,
    default:false
},
acceptGi:{
    type:Boolean,
    default:false
},
createdAt:{
    type:Date,
    default:Date.now
},
},{
     toJSON:{virtuals:true},
     toObject:{virtuals:true}
});

// create Bootcamp slug from the name

BootcamSchema.pre('save',function(next){
     this.slug =  slugify(this.name , {lower:true});
     next();
     });
// Geocode  & create location  field
BootcamSchema.pre('save',  async function(next){
     const loc =  await geocoder.geocode(this.address)  
     this.location  =  {
          type:'Point',
          coordinates:[loc[0].longitude,loc[0].latitude],
          formatedAddress:loc[0].formattedAddress,
          street: loc[0].streetName,
          city: loc[0].city,
          state: loc[0].stateCode,
          zipcode: loc[0].zipcode,
          country: loc[0].countryCode
     }

     // do not save address in db

     this.address =  undefined;

     next()
})

//Cascade delete courses when a bootcamp  is deleted
BootcamSchema.pre('remove', async function(next){
   console.log(`Courses being removed from bootcamp ${this._id}`)
     await this.model('Course').deleteMany({bootcamp:this._id})
  next()
});

// Reverser populate with virtuals
BootcamSchema.virtual('courses',{
   ref:'Course',
   localField:'_id',
   foreignField:'bootcamp',
   justOne:false
});

module.exports = mongoose.model('Bootcamp',BootcamSchema)