import React from 'react'
import { Task } from '../../types/Task'
import styles from './Tasks.module.css'
import axios from 'axios'
import { API_URL } from '../../const/url'
import { useReward } from 'react-rewards'

export const TaskItem = ({ name, stars, status, _id }: Task) => {
  const { reward, isAnimating } = useReward('rewardId', 'confetti')
  const handleClaim = async () => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${_id}`, { status: 'done' })

      if (response.status === 200) {
        await axios.post(`${API_URL}/balance/add`, { stars: stars })
        reward()
        setTimeout(() => window.location.reload(), 1000)
      }
    } catch (error) {
      console.error('Error claiming task:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/tasks/${_id}`)
      window.location.reload()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <div className={styles.task}>
      <div>{name}</div>
      <div>{Array(stars).fill('⭐').join('')}</div>
      <div className={styles.buttonsWrapper}>
        <button
          id='rewardId'
          onClick={handleClaim}
          disabled={status === 'done' || isAnimating}
          className={`${styles.addTaskButton} ${styles.doneButton}`}>
          {status === 'done' ? 'Claimed' : 'Claim'}
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  )
}
