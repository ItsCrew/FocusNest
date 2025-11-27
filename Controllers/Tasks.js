const Task = require('../Models/Tasks')
const asyncWrapper = require('../Middleware/Async')

const FetchAllTasks = asyncWrapper(async (req, res) => {
    const Tasks = await Task.find({ user: req.user._id }).sort({ orderIndex: 1 })
    res.status(200).json({ Tasks })
})

const CreateTask = asyncWrapper(async (req, res) => {
    const maxOrderTask = await Task.findOne({ user: req.user._id })
        .sort({ orderIndex: -1 })
        .select('orderIndex')

    const nextOrderIndex = maxOrderTask ? maxOrderTask.orderIndex + 1 : 0

    const Tasks = await Task.create({ ...req.body, user: req.user._id, orderIndex: nextOrderIndex })
    res.status(201).json({ Tasks })
})

const EditTask = asyncWrapper(async (req, res) => {
    const { id: TaskID } = req.params;
    const Tasks = await Task.findByIdAndUpdate({ _id: TaskID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!Tasks) {
        return res.status(404).json({ msg: `No Task with the ID: ${TaskID} Found!` })
    }
    res.status(200).json({ Tasks })
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

const ReorderTasks = asyncWrapper(async (req, res) => {
    const { orderedIds } = req.body;

    if (!Array.isArray(orderedIds)) {
        return res.status(400).json({ msg: 'orderedIds must be an array' });
    }

    const updatePromises = orderedIds.map((taskId, index) => {
        return Task.findOneAndUpdate(
            { _id: taskId, user: req.user._id },
            { orderIndex: index },
            { new: true }
        );
    });

    await Promise.all(updatePromises);
    res.status(200).json({ msg: 'Tasks reordered successfully' });
})

const FetchPriority = asyncWrapper(async (req, res) => {
    const AllPriorities = await Task.find({ Priority: 'P0' })
    res.status(200).json({ AllPriorities })
})

module.exports = {
    FetchAllTasks,
    CreateTask,
    DeleteTask,
    ClearAll,
    EditTask,
    ReorderTasks,
    FetchPriority
}