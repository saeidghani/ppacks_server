const express = require('express');
const reviewHandler = require('./../routeHandlers/reviewHandler');
const auth = require('./../routeHandlers/authHandler');

const router = express.Router({ mergeParams: true });

//router.use(auth.protect);

router
  .route('/')
  .get(reviewHandler.getAllReviews)
  .post(
    auth.protect,
    auth.restrictTo('user'),
    reviewHandler.setBagUserIds,
    reviewHandler.createReview
  );

router
  .route('/:id')
  .get(reviewHandler.getReview)
  .patch(
    auth.protect,
    auth.restrictTo('user', 'admin'),
    reviewHandler.updateReview
  )
  .delete(
    auth.protect,
    auth.restrictTo('user', 'admin'),
    reviewHandler.deleteReview
  );

module.exports = router;
