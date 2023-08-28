import { Schema, model } from 'mongoose';

const boardSchema = new Schema({
    title: {
        type: String,
        // required: true,
        // required: [true, 'Title is required'],
        // unique: true,
    },
    icon: {
        type:String,
        // required: true,
    },
    background: {
        type: String,
        // required: true,
    },
    ownerId: {
        type: String,
        // required: true,
    },
    columns: {
        type: [{
            title: String,
            boardId: String,
            tasks: []
          }]
    }

}, { versionKey: false })

const Board = model("board", boardSchema);

export default Board;