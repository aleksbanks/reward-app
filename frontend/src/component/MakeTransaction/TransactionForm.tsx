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
  const [isLoading, setIsLoading] = useState(false)

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

  const isValid = () => {
    if (formValues.amount <= 0) {
      alert('Amount must be greater than 0.')
      return false
    }
    if (!formValues.description.trim()) {
      alert('Description cannot be empty.')
      return false
    }
    return true
  }

  const handleTransaction = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!isValid()) return
    setIsLoading(true)
    try {
      const { amount, description } = formValues

      await axios.post(`${API_URL}/transactions/${type === 'buying' ? 'buy' : 'add'}`, {
        amount: Number(amount),
        date: new Date(),
        description
      })
      window.location.reload()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleTransaction}>
      <label>
        Amount:
        <input min='1' type='number' name='amount' value={formValues.amount} onChange={handleInputChange} />
        💲
      </label>
      <br />
      <label>
        Description:
        <input
          placeholder={type === 'buying' ? 'Enter purchase amount' : 'Enter amount to add'}
          type='text'
          name='description'
          value={formValues.description}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button disabled={isLoading} className={styles.button} type='submit'>
        {type === 'buying' ? 'Buy' : 'Add'}
      </button>
    </form>
  )
}
