const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bag = require('./../models/bagModel');
const Review = require('./../models/reviewModel');
const Category = require('./../models/categoryModel');
const Brand = require('./../models/brandModel');
const User = require('./../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_Local;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/categories.json`, 'utf-8')
);
const brands = JSON.parse(fs.readFileSync(`${__dirname}/brands.json`, 'utf-8'));
const bags = JSON.parse(fs.readFileSync(`${__dirname}/bags.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    //await User.create(users, { validateBeforeSave: false });
    //await Category.create(categories);
    //await Brand.create(brands);
    //await Bag.create(bags);
    await Review.create(reviews);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    //await Bag.deleteMany();
    //await User.deleteMany();
    //await Review.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
