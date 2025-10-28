import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  content: {
    type: String,
    required: true,
    minlength: 10
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  author: {
    type: String,
    default: 'Anonymous'
  }
}, { timestamps: true });

export default mongoose.model('Post', postSchema);