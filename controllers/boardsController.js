import Board from '../models/board.js'

const getAllBoards = async (req, res, next) => {
    try {
        const {_id } = req.user;
        console.log(_id);
        const filter = { owner: _id };
        const result = await Board.find(filter, { title: 1, icon: 1, owner: 1, _id: 1 }).populate("owner", "id");
        res.json(result);
      } catch (error) {
        next(error);
      } 
}

const getBoard = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        console.log(boardId);
        const result = await Board.findById(boardId);
        if (!result) {
          throw HttpError(404, "Not found");
        }
        res.json(result);
      } catch (error) {
        next(error);
      }
}

const addBoard = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const result = await Board.create({...req.body, owner:`${_id}`});
        res.status(201).json(result);
      } catch (error) {
        next(error);
      }
}

// const updateBoard = async (req, res, next) => {
  
// }
// const deleteBoard = async (req, res, next) => {
  
// }
// const addColumnInBoard = async (req, res, next) => {
  
// }
// const updateColumnInBoard = async (req, res, next) => {
  
// }
// const deleteColumnInBoard = async (req, res, next) => {
  
// }

export default {
    getAllBoards,
    getBoard,
    addBoard,
    // updateBoard
}