import React, { useState, useEffect } from 'react'
import axios from 'axios'
import type { Balance } from '../../types/Balance'
import { API_URL } from '../../const/url'

export const BalanceItem = () => {
  const [balance, setBalance] = useState<Balance>({ balanceInDollars: 0, balanceInStars: 0 })

  useEffect(() => {
    // Fetch balance from backend
    axios
      .get(`${API_URL}/balance`)
      .then((response) => setBalance(response.data))
      .catch((error) => console.error('Error fetching balance:', error))
  }, [])

  return (
    <div>
      <h2>Balance</h2>
      <p>Dollars: ${balance.balanceInDollars}</p>
      <p>Stars: {balance.balanceInStars}</p>
    </div>
  )
}
