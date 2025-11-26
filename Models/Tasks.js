const mongoose = require('mongoose')

const TasksSchema = new mongoose.Schema({
    Task: {
        type: String,
        required: true
    },
    Color: {
        type: String
    },
    Completed: {
        type: Boolean,
        default: false
    },
    Priority: {
        type: String,
        default: "P0"
    },
    orderIndex: {
        type: Number,
        default: 0
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model("Tasks", TasksSchema)