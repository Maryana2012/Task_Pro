import { Task } from '../models/task.js';

// ok
const getAllTasks = async (req, res) => {
  try {
    const { boardId } = req.body;

    const tasks = await Task.find( {boardId} );
    res.status(200).json(tasks);
  }
  catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

// ok 
const addTask = async (req, res) => {
  try {
     const newTask = await Task.create({...req.body})
     res.status(201).json(newTask);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

// ok
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, text, priority, deadline, boardId, columnId } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    const updateTask = await Task.findByIdAndUpdate(taskId, {...req.body }, {new:true})
    res.status(200).json(updateTask);

  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: error.message });
  }
}

// ok
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await Task.findByIdAndDelete(taskId);

    res.status(200).json(task);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

// ok
const moveTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { newColumnId } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    const updateTask = await Task.findByIdAndUpdate(taskId, { columnId: newColumnId }, { new: true });

    res.status(200).json(updateTask);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

// ok
const getTasksByPriority = async (req, res) => {
  try {
    const { boardId, priority } = req.body;
      
    const filteredTasks = await Task.find({ boardId, priority });
    
    res.status(200).json(filteredTasks);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: error.message });
  }
};

export default {
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByPriority
};


