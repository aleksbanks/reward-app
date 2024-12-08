import { ReactNode, useEffect, useRef, useState } from 'react'
import { createContainer } from '../../../utils/createContainer'
import { Portal } from './Portal'

import styles from './styles.module.css'

export type Props = {
  open: boolean
  onClose?: () => void
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  className?: string
}

const MODAL_CONTAINER_ID = 'modal-container-id'

export const Modal = ({ onClose, open, children, header, footer, className }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isMounted, setMounted] = useState(false)

  // Effect to create the modal container and set the mounted state when the modal is open
  useEffect(() => {
    if (open) {
      createContainer({ id: MODAL_CONTAINER_ID })
      setMounted(true)
      return
    }
    setMounted(false)
  }, [open])

  // Effect to handle escape key press and close the modal
  useEffect(() => {
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }
    window.addEventListener('keydown', handleEscapePress)
    return () => {
      window.removeEventListener('keydown', handleEscapePress)
    }
  }, [onClose])

  // Effect to set the body overflow style when the modal is open, so it doesn't scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (!isMounted) return null

  return (
    <Portal id={MODAL_CONTAINER_ID}>
      <div className={styles.wrapper} ref={rootRef}>
        <div className={`${className || ''} ${styles.container}`}>
          <div className={`${styles.contentWrapper} ${Boolean(footer) ? styles.withFooter : ''}`}>
            <div className={styles.header}>
              <div>{header}</div>
            </div>
            <div className={styles.content}>{children}</div>
          </div>
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    </Portal>
  )
}
