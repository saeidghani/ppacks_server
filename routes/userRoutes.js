const express = require('express');
const userHandler = require('./../routeHandlers/userHandler');
const auth = require('./../routeHandlers/authHandler');

const router = express.Router();

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.post('/forgotPassword', auth.forgotPassword);
router.patch('/resetPassword/:token', auth.resetPassword);

// Protect all routes after this middleware
router.use(auth.protect);

router.patch('/updateMyPassword', auth.updatePassword);
router.get('/me', userHandler.getMe, userHandler.getUser);
router.patch('/updateMe', userHandler.updateMe);
router.delete('/deleteMe', userHandler.deleteMe);

router.use(auth.restrictTo('admin'));

router
    .route('/')
    .get(userHandler.getAllUsers)
    .post(userHandler.createUser);

router
    .route('/:id')
    .get(userHandler.getUser)
    .patch(userHandler.updateUser)
    .delete(userHandler.deleteUser);

module.exports = router;
