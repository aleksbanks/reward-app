import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../const/url'

export const AddTask = () => {
  const [name, setName] = useState<string>('')
  const [stars, setStars] = useState<number>(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const newTask = { name, stars }
      await axios.post(`${API_URL}/tasks`, newTask)
      alert('Task added successfully!')
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Stars:</label>
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value) || 1)}
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  )
}
