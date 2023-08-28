import {Board} from '../models/task.js';

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






export default {
    boardCreate,
    columnCreate
};