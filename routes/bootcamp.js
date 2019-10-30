const express = require("express")
const {
    getBootcamp,getBootcamps,
    createBootcamp,updateBootcamp,deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
  }
  =  require("../controllers/bootcamp")

// Include other resource  routers
const courseRouter =  require('./course');
const router =  express.Router();

//Reroute  into other resource router
router.use('/:bootcampId/courses',courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(getBootcamps).post(createBootcamp)
router.route('/:id').get(getBootcamp).put(updateBootcamp)
.delete(deleteBootcamp)
router.route('/:id/photo').put(bootcampPhotoUpload)

module.exports = router;
