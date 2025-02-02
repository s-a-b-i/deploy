import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Category = mongoose.model('Category', categorySchema);
const FAQ = mongoose.model('FAQ', faqSchema);


// Middleware to delete related FAQs when a category is deleted
categorySchema.pre('findOneAndDelete', async function(next) {
  const categoryId = this.getQuery()._id;
  try {
    await FAQ.deleteMany({ category: categoryId });
    next();
  } catch (error) {
    next(error);
  }
});


export { Category, FAQ };