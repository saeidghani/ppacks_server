const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      bag: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bag',
        required: [true, 'order must belong to a Bag!']
      },
      size: String,
      color: { colorName: String, colorId: String },
      count: Number,
      protectionType: {
        title: String,
        additionalPrice: Number
      },
      price: {
        type: Number,
        require: [true, 'order must have a price.']
      }
    }
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'order must belong to a User!']
  },
  totalPrice: {
    type: Number,
    require: [true, 'order must have a price.']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: false
  }
});

orderSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path: 'Bag',
    select: 'name'
  });
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
