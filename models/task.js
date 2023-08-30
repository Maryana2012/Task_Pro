import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  boardId: String,
  columnId: String,
  title: String,
  text: String,
  priority: String,
  deadline: String
});

export const Task = model('Task', taskSchema);

