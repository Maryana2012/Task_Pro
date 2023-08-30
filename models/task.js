import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  boardId: {
    type: String,
    required: true
  },
  columnId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'without'],
    default:'without',
  }, 
  deadline: {
    type: String,
    required: true
  }
});

export const Task = model('Task', taskSchema);

