import React, { useState, useEffect } from 'react'
import axios from 'axios'
import type { Task } from '../../types/Task'
import { API_URL } from '../../const/url'
import { AddTask } from './AddTask'
import styles from './Tasks.module.css'
import { TaskItem } from './TaskItem'

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    axios
      .get(`${API_URL}/tasks`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error))
  }, [])

  return (
    <div className={styles.list}>
      <AddTask />
      <br />

      {Boolean(tasks.length) && (
        <>
          <h3>Task List:</h3>
          <div className={styles.taskList}>
            <div className={styles.task}>
              <div>
                <b>Name</b>
              </div>
              <div>
                <b>How many stars you get:</b>
              </div>
              <div>
                <b>Claim</b>
              </div>
            </div>
            {tasks.map((task) => (
              <TaskItem key={task._id} {...task} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
