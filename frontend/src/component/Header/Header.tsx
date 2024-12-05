import React from 'react'
import { BalanceItem } from '../Balance/Balance'

export const Header = () => {
  return (
    <div>
      <h1>Hello, Alisa!</h1>
      <h2>Welcome to your Reward App</h2>
      <div>Complete tasks and get rewards</div>
      <BalanceItem />
    </div>
  )
}
