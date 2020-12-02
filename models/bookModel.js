const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongoose.Schema({
  bookId: String,
  title: {
    type: String,
    required: [true, 'A bag must have a title'],
    trim: true,
    maxlength: [255, 'A bag name must have less or equal then 40 characters'],
    minlength: [3, 'A bag name must have more or equal then 10 characters'],
  },
  slug: String,
  pages: {
    type: Number,
    required: [true, 'A bag must have a price'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

bookSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  //this.start = Date.now();
  next();
});

// bookSchema.post(/^find/, function(docs, next) {
//     console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//     next();
// });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
