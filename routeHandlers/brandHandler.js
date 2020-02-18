const Brand = require('./../models/brandModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.getAllBrands = factory.getAll(Brand);
exports.createBrand = factory.createOne(Brand);
