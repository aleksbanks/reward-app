import React, { useState, useEffect } from 'react'
import axios from 'axios'
import type { Balance } from '../../types/Balance'
import { API_URL } from '../../const/url'
import styles from './Balance.module.css'

export const BalanceItem = () => {
  const [balance, setBalance] = useState<Balance>({ balanceInDollars: 0, balanceInStars: 0 })

  useEffect(() => {
    axios
      .get(`${API_URL}/balance`)
      .then((response) => setBalance(response.data))
      .catch((error) => console.error('Error fetching balance:', error))
  }, [])

  return (
    <div className={styles.balance}>
      <p>
        💲 Dollars: <b>{balance.balanceInDollars}</b>
      </p>
      <p>
        ⭐ Stars: <b>{balance.balanceInStars}</b>
      </p>
    </div>
  )
}
