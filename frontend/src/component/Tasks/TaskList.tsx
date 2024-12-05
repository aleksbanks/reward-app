import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Task } from '../../types/Task'
import { API_URL } from '../../const/url'

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    // Fetch tasks from the backend
    axios
      .get(`${API_URL}/tasks`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error))
  }, [])

  if (!tasks.length) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.name} - {task.stars} Stars - Status: {task.status}
          </li>
        ))}
      </ul>
    </div>
  )
}
