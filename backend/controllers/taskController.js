const Task = require('../models/Task')

// Controller for creating a task
exports.createTask = async (req, res) => {
  const { name, stars } = req.body
  try {
    const newTask = new Task({ name, stars })
    await newTask.save()
    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' })
  }
}

// Controller for updating a task
exports.updateTask = async (req, res) => {
  const { name, stars } = req.body
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { name, stars }, { new: true })
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' })
  }
}

// Controller for deleting a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.json({ message: 'Task deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' })
  }
}

// Controller for marking a task as done
exports.markTaskDone = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { status: 'done' }, { new: true })
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: 'Error updating task status' })
  }
}

// Controller for getting all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' })
  }
}
