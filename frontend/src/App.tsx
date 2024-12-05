import React from 'react'
import { Header } from './component/Header/Header'
import { TaskList } from './component/Tasks/TaskList'
import { AddTask } from './component/Tasks/AddTask'

const App = () => {
  return (
    <div>
      <Header />
      <AddTask />
      <TaskList />
    </div>
  )
}

export default App
