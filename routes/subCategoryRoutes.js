const express = require('express');
const {getAllSubcategories, createSubcategory} = require('../routeHandlers/subcategoryHandler');
const auth = require('../routeHandlers/authHandler');

const router = express.Router();

router
    .route('/')
    .get(getAllSubcategories)
    .post(auth.protect, auth.restrictTo('admin'), createSubcategory);

module.exports = router;