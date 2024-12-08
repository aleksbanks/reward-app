import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  id: string
  children: ReactNode
}

/**
 * A Portal component that renders its children into a container element with the specified ID.
 */
export const Portal = ({ id, children }: Props) => {
  const [container, setContainer] = useState<HTMLElement>()

  // Effect hook to find and set the container element when the ID changes
  useEffect(() => {
    if (id) {
      const portalContainer = document.getElementById(id)
      if (!portalContainer) {
        return
      }
      setContainer(portalContainer)
    }
  }, [id])

  return container ? createPortal(children, container) : null
}
