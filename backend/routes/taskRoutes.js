const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const validateTask = require('../middleware/validateTask')

// Route for creating a new task
router.post('/', validateTask, taskController.createTask)

// Route for editing a task
router.put('/:id', validateTask, taskController.updateTask)

// Route for deleting a task
router.delete('/:id', taskController.deleteTask)

// Route for marking a task as done
router.patch('/:id', taskController.markTaskDone)

// Route for getting all tasks
router.get('/', taskController.getAllTasks)

module.exports = router
