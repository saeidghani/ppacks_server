const Book = require('./../models/bookModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.getAllBooks = factory.getAll(Book);
exports.createBook = factory.createOne(Book);
exports.getBook = factory.getOne(Book);
exports.deleteBook = factory.deleteOne(Book);
exports.updateBook = factory.updateOne(Book);
