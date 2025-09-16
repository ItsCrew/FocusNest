const Task = require('../Models/Tasks')
const asyncWrapper = require('../Middleware/Async')

const FetchAllTasks = asyncWrapper(async (req, res) => {
    const Tasks = await Task.find({ user: req.user._id })
    res.status(200).json({ Tasks })
})

const CreateTask = asyncWrapper(async (req, res) => {
    const Tasks = await Task.create({ ...req.body, user: req.user._id })
    res.status(201).json({ Tasks })
})

const EditTask = asyncWrapper(async (req, res) => {
    const { id: TaskID } = req.params;
    const Tasks = await Task.findByIdAndUpdate({ _id: TaskID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!Task) {
        return res.status(404).json({ msg: `No Task with the ID: ${TaskID} Found!` })
    }
})

const DeleteTask = asyncWrapper(async (req, res) => {
    const { id: TaskID } = req.params;
    const Tasks = await Task.findOneAndDelete({ _id: TaskID })
    if (!Tasks) {
        return res.status(404).json({ msg: `No Task with id: ${TaskID} Found` })
    }
    res.status(200).json({ Tasks })
})

const ClearAll = asyncWrapper(async (req, res) => {
    const Tasks = await Task.deleteMany({ user: req.user._id })
    res.status(200).json({ Tasks })
})

module.exports = {
    FetchAllTasks,
    CreateTask,
    DeleteTask,
    ClearAll,
    EditTask
}