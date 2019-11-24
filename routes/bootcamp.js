const express = require("express")
const advancedResults =  require("../middleware/advancedResults")
const Bootcamp =  require("../models/Bootcamp")
const {
    getBootcamp,getBootcamps,
    createBootcamp,updateBootcamp,deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
  }
  =  require("../controllers/bootcamp")

  const {protect}  = require("../middleware/auth");


// Include other resource  routers
const courseRouter =  require('./course');
const router =  express.Router();

//Reroute  into other resource router
router.use('/:bootcampId/courses',courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
  .route('/')
  .get(advancedResults(Bootcamp,'courses'),getBootcamps)
  .post(protect,createBootcamp)

router
.route('/:id')
.get(getBootcamp)
.put(protect, updateBootcamp)
.delete(protect,deleteBootcamp)

router
   .route('/:id/photo')
   .put(bootcampPhotoUpload)

module.exports = router;
