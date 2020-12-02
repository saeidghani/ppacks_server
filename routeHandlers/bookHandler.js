const Book = require('./../models/bookModel');
const factory = require('./handlerFactory');

exports.getAllBooks = factory.getAll(Book);
exports.createBook = factory.createOne(Book);
exports.getBook = factory.getOne(Book);
exports.deleteBook = factory.deleteOne(Book);
exports.updateBook = factory.updateOne(Book);
