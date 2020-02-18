const Subcategory = require('./../models/subcategoryModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.getAllSubcategories = factory.getAll(Subcategory);
exports.createSubcategory = factory.createOne(Subcategory);
