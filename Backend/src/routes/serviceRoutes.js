const express = require('express');
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController.js');
const  advancedResults = require("../middleware/advancedResults");
const Service = require("../models/serviceModel");


const router = express.Router();

router.get('/', advancedResults(Service), getServices);


router
  .route('/')
  .get(getServices)
  .post(createService);

router
  .route('/:id')
  .get(getService)
  .put(updateService)
  .delete(deleteService);

module.exports = router;