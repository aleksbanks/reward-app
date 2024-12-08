import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import type { Task } from '../../types/Task'
import { API_URL } from '../../const/url'
import { AddTask } from './AddTask'
import styles from './Tasks.module.css'
import { TaskItem } from './TaskItem'
import { DraggableIcon } from '../../svg/DraggableIcon'

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const itemDrag = useRef<number | null>(null)
  const itemDragOver = useRef<number | null>(null)

  const dragStart = (e: React.DragEvent<HTMLDivElement>, itemIndex: number) => {
    e.stopPropagation()
    itemDrag.current = itemIndex
  }
  const dragEnter = (e: React.DragEvent<HTMLDivElement>, itemIndex: number) => {
    e.stopPropagation()
    itemDragOver.current = itemIndex
  }

  const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (itemDrag.current === null || itemDragOver.current === null) return
    // мутируем сет стейт

    const dragItemContent = tasks[itemDrag.current]
    const copyTasks = [...tasks]
    copyTasks.splice(itemDrag.current, 1)
    copyTasks.splice(itemDragOver.current, 0, dragItemContent)
    setTasks(copyTasks)

    itemDrag.current = null
    itemDragOver.current = null
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/tasks`)
      .then((response) =>
        setTasks(
          response.data.filter((task: Task) => task.status === 'undone').sort((a: Task, b: Task) => b.stars - a.stars)
        )
      )
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

            {tasks.map((task, index) => (
              <div
                className={styles.taskRow}
                onDragEnd={(e) => dragEnd(e)}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => {
                  dragEnter(e, index)
                }}
                onDragOver={(event) => {
                  event.preventDefault()
                }}
                draggable
                key={task._id}>
                <DraggableIcon />
                <TaskItem key={task._id} {...task} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
