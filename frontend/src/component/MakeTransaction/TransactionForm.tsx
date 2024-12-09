import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../const/url'
import styles from './MakeTransaction.module.css'

type Props = { type: 'buying' | 'adding' }
type FormValues = {
  amount: number
  description: string
}

export const TransactionForm = ({ type }: Props) => {
  const [formValues, setFormValues] = useState<FormValues>({
    amount: 0,
    description: ''
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handleTransaction = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const { amount, description } = formValues

      await axios.post(`${API_URL}/transactions/${type === 'buying' ? 'buy' : 'add'}`, {
        amount: Number(amount),
        date: new Date(),
        description
      })
      window.location.reload()
    } catch (error) {
      console.error('Error buying:', error)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleTransaction}>
      <label>
        Amount:
        <input type='number' name='amount' value={formValues.amount} onChange={handleInputChange} />
        💲
      </label>
      <br />
      <label>
        Description:
        <input type='text' name='description' value={formValues.description} onChange={handleInputChange} />
      </label>
      <br />
      <button className={styles.button} type='submit'>
        {type === 'buying' ? 'Buy' : 'Add'}
      </button>
    </form>
  )
}
