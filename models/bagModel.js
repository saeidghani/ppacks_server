const mongoose = require('mongoose');
const slugify = require('slugify');

const bagSchema = new mongoose.Schema({
  productId: String,
  title: {
    type: String,
    required: [true, 'A bag must have a title'],
    trim: true,
    maxlength: [255, 'A bag name must have less or equal then 40 characters'],
    minlength: [3, 'A bag name must have more or equal then 10 characters']
  },
  slug: String,
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category'
  },
  brand: {
    type: mongoose.Schema.ObjectId,
    ref: 'Brand'
  },
  sizes: [String],
  currentPrice: {
    type: Number,
    required: [true, 'A bag must have a price']
  },
  previousPrice: {
    type: Number,
    validate: {
      validator: function(val) {
        return val >= this.currentPrice;
      },
      message: 'Previous price {Value} should be more than current price'
    }
  },
  deliveryDuration: {
    type: String,
    required: [true, 'A bag must have a delivery duration'],
    enum: {
      values: ['3 hours', '2 days'],
      message: 'delivery duration is either: 3 hours, 2 days'
    }
  },
  protectionTypes: [
    {
      title: String,
      additionalPrice: {
        type: Number,
        default: 4.99,
        min: [2.99, 'additional price must be above 2.99'],
        max: [39.99, 'additional price must be below 39.99']
      }
    }
  ],
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: val => Math.round(val * 10) / 10
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: true
  },
  secretBag: {
    type: Boolean,
    default: false,
    select: false
  },
  coverImage: String,
  detailImages: [String],
  colorImages: [
    {
      colorImageName: String,
      colorImageId: String
    }
  ]
});

bagSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  //this.start = Date.now();
  next();
});

// bagSchema.post(/^find/, function(docs, next) {
//     console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//     next();
// });

const Bag = mongoose.model('Bag', bagSchema);

module.exports = Bag;
