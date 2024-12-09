import React from 'react'
import { CatSvg } from '../../svg/Cat'
import styles from './Header.module.css'
import { MakeTransaction } from '../MakeTransaction/MakeTransaction'

export const Header = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.text}>
        <div>
          <h1>Hello, Alisa!</h1>
          <h2>Welcome to your Reward App.</h2>
        </div>
        <div>
          Complete your tasks and get stars.
          <br />
          Every <b>10</b> stars you get <b>one</b> dollar.
          <br />
          Every <b>Sunday</b> you get 10$.
        </div>
        <MakeTransaction />
      </div>
      <CatSvg />
    </div>
  )
}
