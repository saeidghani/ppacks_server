const express = require('express');
const { getAllBrands, createBrand } = require('../routeHandlers/brandHandler');
const bagRouter = require('./bagRoutes');
const auth = require('../routeHandlers/authHandler');

const router = express.Router();

router.use('/:brandId/bags', bagRouter);

router
  .route('/')
  .get(getAllBrands)
  .post(auth.protect, auth.restrictTo('admin'), createBrand);

module.exports = router;
