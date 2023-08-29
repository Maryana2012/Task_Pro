import { Board } from '../models/task.js';
import { Task } from '../models/task.js';

const boardCreate = async (req, res) => {
    const { title, icon, background } = req.body;
    const newBoard = await Board.create({...req.body})

}

const columnCreate = async (req, res) => {
    const { _id } = req.params;
    const { title } = req.body;
    const board = await Board.findById(_id);
    console.log(board);

    board.columns.push({ title });
    console.log(board)
    return board.save();
}

const getAllTasks = async (req, res) => {
  try {
    const { boardId } = req.query;

    const tasks = await Task.find({ boardId });
      
    const formattedTasks = tasks.map(task => ({
      boardId: task.boardId,
      columnId: task.columnId,
      title: task.title,
      text: task.text,
      priority: task.priority,
      deadline: task.deadline,
      _id: task._id
    }));

    return res.status(200).json(formattedTasks);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: 'Error' });
  }
}

const addTask = async (req, res) => {
  try {
    const { title, text, priority, deadline, boardId, columnId } = req.body;

    const newTask = new Task({
      boardId,
      columnId,
      title,
      text,
      priority,
      deadline
    });

    const savedTask = await newTask.save();

    const formattedTask = {
      boardId: savedTask.boardId,
      columnId: savedTask.columnId,
      title: savedTask.title,
      text: savedTask.text,
      priority: savedTask.priority,
      deadline: savedTask.deadline,
      _id: savedTask._id
    };

    return res.status(201).json(formattedTask);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: 'Error' });
  }
}

const updateTask = async (req, res) => {
  try {
    const { title, text, priority, deadline, boardId, columnId } = req.body;
    
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.boardId = boardId;
    task.columnId = columnId;
    task.title = title;
    task.text = text;
    task.priority = priority;
    task.deadline = deadline;

    const updatedTask = await task.save();

    const formattedTask = {
      boardId: updatedTask.boardId,
      columnId: updatedTask.columnId,
      title: updatedTask.title,
      text: updatedTask.text,
      priority: updatedTask.priority,
      deadline: updatedTask.deadline,
      _id: updatedTask._id
    }

    return res.status(200).json(formattedTask);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: 'Error' });
  }
}

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.remove();

    const formattedTask = {
      boardId: task.boardId,
      columnId: task.columnId,
      title: task.title,
      text: task.text,
      priority: task.priority,
      deadline: task.deadline,
      _id: task._id
    };

    return res.status(200).json(formattedTask);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: 'Error' });
  }
}

const moveTask = async (req, res) => {
  try {
    const { taskId, newColumnId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
      }
      
    task.columnId = newColumnId;

    const updatedTask = await task.save();

    const formattedTask = {
      boardId: updatedTask.boardId,
      columnId: updatedTask.columnId,
      title: updatedTask.title,
      text: updatedTask.text,
      priority: updatedTask.priority,
      deadline: updatedTask.deadline,
      _id: updatedTask._id
    };

    return res.status(200).json(formattedTask);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: 'Error' });
  }
}

const getTasksByPriority = async (req, res) => {
  try {
    const { boardId, priority } = req.query;
      
    const filteredTasks = await Task.find({ boardId, priority });

    const formattedTasks = filteredTasks.map(task => ({
      boardId: task.boardId,
      columnId: task.columnId,
      title: task.title,
      text: task.text,
      priority: task.priority,
      deadline: task.deadline,
      _id: task._id
    }));

    return res.status(200).json(formattedTasks);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: 'Error' });
  }
};

export default {
    boardCreate,
    columnCreate,
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByPriority
};