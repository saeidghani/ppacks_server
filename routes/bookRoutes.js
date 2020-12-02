const express = require('express');
const {
  getAllBooks,
  createBook,
  getBook,
  deleteBook,
  updateBook,
} = require('../routeHandlers/bookHandler');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllBooks).post(createBook);

router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook);

module.exports = router;
