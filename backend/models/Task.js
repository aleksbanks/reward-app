const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stars: {
    type: Number,
    required: true,
    min: [1, 'Stars must be at least 1'],
    max: [5, 'Stars cannot be greater than 5'],
  },
  status: { type: String, default: 'undone', enum: ['undone', 'done'] },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Task', taskSchema)
