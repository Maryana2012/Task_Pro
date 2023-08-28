import Board from "../models/board.js";
import HttpError from "../helpers/httpError.js";


const getAllBoards = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const filter = { ownerId: _id };
    const result = await Board.find(filter, {
      title: 1,
      icon: 1,
      ownerId: 1,
      _id: 1,
    }).populate("ownerId", "id");
    res.json(result);
  } catch (error) {
    next(error);
  }
};


const getBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const result = await Board.findById(boardId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};


const addBoard = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const { title, icon, background } = req.body;
    if (
      !title ||
      !title.trim() ||
      !icon ||
      !icon.trim() ||
      !background ||
      !background.trim()
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const result = await Board.create({ ...req.body, ownerId: `${_id}` });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};


const updateBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { title, icon, background } = req.body;

    const currentBoard = await Board.findById(boardId);

    if (!currentBoard) {
      throw HttpError(404, "Not found");
    }

    const updatedFields = {};

    if (title !== undefined && title.trim() && title !== currentBoard.title) {
      updatedFields.title = title;
    }
    if (icon !== undefined && icon !== currentBoard.icon) {
      updatedFields.icon = icon;
    }
    if (background !== undefined && background !== currentBoard.background) {
      updatedFields.background = background;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res
        .status(400)
        .json({ message: "At least one field must be different" });
    }

    const result = await Board.findByIdAndUpdate(boardId, updatedFields, {
      new: true,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};


const deleteBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const result = await Board.findByIdAndDelete(boardId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "Board deleted",
    });
  } catch (error) {
    next(error);
  }
};


const addColumn = async (req, res, next) => {
  try {
    const { boardId } = req.params;

    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Enter the column title" });
    }

    const board = await Board.findById(boardId);

    const existingColumn = board.columns.find(
      (column) => column.title === title
    );
    if (existingColumn) {
      return res
        .status(409)
        .json({ message: `A column with the name "${title}" already exists` });
    }

    board.columns.push({ title, boardId: boardId });
    await board.save();

    res.status(201).json(board.columns[board.columns.length - 1]);
  } catch (error) {
    next(error);
  }
};


const updateColumn = async (req, res, next) => {
  try {
    const { boardId, columnId } = req.params;

    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const board = await Board.findById(boardId);

    const columnIndex = board.columns.findIndex(
      (column) => column._id.toString() === columnId
    );

    if (columnIndex === -1) {
      return res.status(404).json({ message: "Column not found" });
    }

    if (title === board.columns[columnIndex].title) {
      return res.status(400).json({ message: "New title must be different" });
    }

    board.columns[columnIndex].title = title;
    await board.save();

    res.json(board.columns[columnIndex]);
  } catch (error) {
    next(error);
  }
};


const deleteColumn = async (req, res, next) => {
  try {
    const { boardId, columnId } = req.params;
    const board = await Board.findById(boardId);

    const columnIndex = board.columns.findIndex(
      (column) => column._id.toString() === columnId
    );
    if (columnIndex === -1) {
      return res.status(404).json({ message: "Column not found" });
    }
    board.columns.splice(columnIndex, 1);
    await board.save();

    res.status(200).json({ message: "Column deleted" });
  } catch (error) {
    next(error);
  }
};


export default {
  getAllBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
  addColumn,
  updateColumn,
  deleteColumn,
};
