const mongoose = require('mongoose');
const slugify = require('slugify');

const subcategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A subcategory must have a title'],
        trim: true,
        maxlength: [40, 'A subcategory name must have less or equal then 20 characters'],
        minlength: [3, 'A subcategory name must have more or equal then 10 characters']
    },
    slug: String,
});

subcategorySchema.pre('save', function(next){
    this.slug = slugify(this.title, {lower: true});
    //this.start = Date.now();
    next();
});

// bagSchema.post(/^find/, function(docs, next) {
//     console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//     next();
// });

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;