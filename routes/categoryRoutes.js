const express = require('express');
const {getAllCategories, createCategory} = require('../routeHandlers/categoryHandler');
const auth = require('../routeHandlers/authHandler');
const bagRouter = require('./bagRoutes');

const router = express.Router();

router.use('/:categoryId/bags', bagRouter)

router
    .route('/')
    .get(getAllCategories)
    .post(auth.protect, auth.restrictTo('admin'), createCategory);

module.exports = router;
