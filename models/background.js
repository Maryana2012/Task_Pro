import mongoose from 'mongoose';

const choiceBackgroundSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  previewURL: {
    type: String,
    required: true,
  },
});

const background = mongoose.model('background', choiceBackgroundSchema);

export default background;