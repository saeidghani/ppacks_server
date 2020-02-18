const express = require('express');
const {
  getOrder,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder
} = require('./../routeHandlers/orderHandler');
const auth = require('./../routeHandlers/authHandler');

const router = express.Router();

// router.use(auth.protect);

// router.use(auth.restrictTo('admin'));

router
  .route('/')
  .get(getAllOrders)
  .post(createOrder);

router
  .route('/:id')
  .get(getOrder)
  .patch(updateOrder)
  .delete(deleteOrder);

module.exports = router;
