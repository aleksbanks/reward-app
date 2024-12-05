import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../const/url'
import styles from './Tasks.module.css'

export const AddTask = () => {
  const [name, setName] = useState<string>('')
  const [stars, setStars] = useState<number>(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const newTask = { name, stars }
      await axios.post(`${API_URL}/tasks`, newTask)
      window.location.reload()
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const handleStarClick = (rating: number) => {
    setStars(rating)
  }

  return (
    <div className={styles.newTask}>
      <form
        className={styles.newTaskForm}
        onSubmit={(e) => {
          e.preventDefault()
        }}>
        <div className={styles.inputs}>
          <div className={styles.inputWrapper}>
            <input
              placeholder='Add new task'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.stars}>
            {/* Display 5 stars, highlight selected ones */}
            {[1, 2, 3, 4, 5].map((starValue) => (
              <svg
                key={starValue}
                className={`${styles.star} ${starValue <= stars ? styles.selected : ''}`}
                onClick={() => handleStarClick(starValue)}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'>
                <path
                  d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                  fill='currentColor'
                />
              </svg>
            ))}
          </div>
        </div>
        <button onClick={handleSubmit} className={styles.addTaskButton} type='submit'>
          +
        </button>
      </form>
    </div>
  )
}
