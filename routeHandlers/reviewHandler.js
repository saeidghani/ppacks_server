const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.setBagUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.bag) req.body.bag = req.params.bagId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.updateReview = catchAsync(async (req, res, next) => {
  const doc = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  const isReviewOwner =
    req.body.helpfulBy && req.body.helpfulBy.includes(doc.user._id.toString());
  if (isReviewOwner) {
    return next(new AppError('restrictOwnerFrom', 400));
  }

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
