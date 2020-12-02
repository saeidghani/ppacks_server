const Bag = require('./../models/bagModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.getAllBags = factory.getAll(Bag, [
  { path: 'category', select: '-__v' },
  { path: 'brand', select: '-__v' },
]);
exports.createBag = factory.createOne(Bag);
exports.getBag = factory.getOne(Bag, [
  { path: 'category', select: '-_v' },
  { path: 'brand', select: '-_v' },
]);
exports.deleteBag = factory.deleteOne(Bag);
exports.updateBag = factory.updateOne(Bag);
