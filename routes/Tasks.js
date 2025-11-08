const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../Middleware/Auth')

const { FetchAllTasks, CreateTask, DeleteTask, ClearAll, EditTask, ReorderTasks } = require('../Controllers/Tasks')

router.route('/').get(isAuthenticated, FetchAllTasks).post(isAuthenticated, CreateTask).delete(isAuthenticated, ClearAll)
router.route('/reorder').post(isAuthenticated, ReorderTasks)
router.route('/:id').delete(isAuthenticated, DeleteTask).patch(isAuthenticated, EditTask)
module.exports = router;