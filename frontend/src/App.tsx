import React from 'react'
import { Header } from './component/Header/Header'
import { TaskList } from './component/Tasks/TaskList'
import './App.css'
import { BalanceItem } from './component/Balance/Balance'

const App = () => {
  return (
    <div className='App'>
      <Header />
      <BalanceItem />
      <TaskList />
    </div>
  )
}

export default App
