import { isValidObjectId } from "mongoose";

export const isValidBoardId = (req, res, next) => {
    const { boardId } = req.params;
    if (!isValidObjectId(boardId)) {
        return next( res.status(404).json({message: `${boardId} is not valid id`}));
    }
    next();
}
export const isValidColumnId = (req, res, next) => {
    const { columnId } = req.params;
    if (!isValidObjectId(columnId)) {
        return next( res.status(404).json({message: `${columnId} is not valid id`}));
    }
    next();
}
