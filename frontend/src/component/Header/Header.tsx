import React from 'react'
import { CatSvg } from '../../svg/Cat'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.text}>
        <div>
          <h1>Hello, Alisa!</h1>
          <h2>Welcome to your Reward App</h2>
        </div>
        <div>
          Complete your tasks and get stars.
          <br />
          Every 10 stars you get one dollar.
        </div>
      </div>
      <CatSvg />
    </div>
  )
}
