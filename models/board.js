import { Schema, model } from 'mongoose';

const boardSchema = new Schema({
    title: {
        type: String,
        unique: true,
    },
    icon: {
        type: String,
    },
    background: {
        type: String,
        // type: Object,
    },
    ownerId: {
            type: String,
    },
    columns: {
            type: [{
                title: String,
                boardId: String,
                tasks: []
            }]
    }
}, { versionKey: false, timestamps: true })

const Board = model("board", boardSchema);

export default Board;