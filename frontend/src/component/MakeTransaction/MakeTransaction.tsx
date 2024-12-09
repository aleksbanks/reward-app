import { useState } from 'react'
import { Modal } from '../Modals/Basic/Modal'
import styles from './MakeTransaction.module.css'
import { TransactionForm } from './TransactionForm'

export const MakeTransaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBuyTransaction, setIsBuyTransaction] = useState(true)

  return (
    <>
      <button className={styles.button} onClick={() => setIsModalOpen(true)}>
        Manage funds
      </button>

      <Modal
        open={isModalOpen}
        header={
          <div className={styles.header}>
            <div
              className={`${isBuyTransaction ? styles.selectedTab : ''} ${styles.tab}`}
              onClick={() => setIsBuyTransaction(true)}>
              Spend
            </div>
            <div
              className={`${!isBuyTransaction ? styles.selectedTab : ''} ${styles.tab}`}
              onClick={() => setIsBuyTransaction(false)}>
              Add
            </div>
          </div>
        }
        onClose={() => setIsModalOpen(false)}>
        <div className={styles.content}>
          <TransactionForm type={isBuyTransaction ? 'buying' : 'adding'} />
        </div>
      </Modal>
    </>
  )
}
