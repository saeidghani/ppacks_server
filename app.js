const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AccessControl = require('express-ip-access-control');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./routeHandlers/errorHandler');
const bagRouter = require('./routes/bagRoutes');
const brandRouter = require('./routes/brandRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const orderRouter = require('./routes/orderRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookRouter = require('./routes/bookRoutes');

const app = express();

// const options = {
//   mode: 'deny',
//   denys: [],
//   allows: [
//     '46.224.2.32/29',
//     '185.112.35.144/28',
//     '185.143.232.0/22',
//     '79.175.138.128/29',
//     '92.114.16.80/28',
//     '2.146.0.0/28',
//     '185.49.87.120/29',
//     '5.160.139.200/29',
//     '185.20.160.248/29',
//     '195.181.173.128/29',
//     '185.152.67.56/29',
//     '89.187.175.136/29',
//     '89.187.178.96/29',
//     '89.187.169.88/29',
//     '185.246.211.64/27',
//     '83.123.255.40/31',
//     '188.229.116.16/29',
//     '83.121.255.40/31',
//     '164.138.128.68/31',
//     '130.185.120.0/23',
//     '45.76.176.64/28',
//     '198.13.38.112/28',
//     '149.28.160.0/28',
//     '94.182.182.28/30'
//   ],
//   forceConnectionAddress: false,
//   log: function(clientIp, access) {
//     console.log(clientIp + (access ? ' accessed.' : ' denied.'));
//   },

//   statusCode: 401,
//   redirectTo: '',
//   message: 'Unauthorized'
// };

// app.use(AccessControl(options));

app.use(cors());
app.options('*', cors());

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(
//     hpp({
//         whitelist: [
//             'duration',
//             'ratingsQuantity',
//             'ratingsAverage',
//             'maxGroupSize',
//             'difficulty',
//             'price'
//         ]
//     })
// );

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) ROUTES
app.use('/api/v1/bags', bagRouter);
app.use('/api/v1/brands', brandRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/books', bookRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
