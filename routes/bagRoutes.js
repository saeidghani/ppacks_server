const express = require("express");
const {
  getAllBags,
  createBag,
  getBag,
  deleteBag,
  updateBag
} = require("../routeHandlers/bagHandler");
const auth = require("../routeHandlers/authHandler");

const router = express.Router({mergeParams: true});

router
  .route("/")
  .get(getAllBags)
  .post(auth.protect, auth.restrictTo("admin"), createBag);

router
  .route("/:id")
  .get(getBag)
  .patch(auth.protect, auth.restrictTo("admin"), updateBag)
  .delete(auth.protect, auth.restrictTo("admin"), deleteBag);

module.exports = router;
