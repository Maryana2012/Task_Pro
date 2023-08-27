import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const boardSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    title: String,
    icon: String, 
    background: String,
    // columns: [{
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Column',

    // }]
    columns: [
        {
        _id: mongoose.Schema.Types.ObjectId,
        title: String
        }
    ]
    
});



// const columnsSchema = new Schema({
//     title: {
//         type:String
//     }
// })


export const Board = model('tasks', boardSchema);
// export const Column = model('task', columnsSchema)