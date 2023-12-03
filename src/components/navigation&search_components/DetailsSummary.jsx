import { useState } from 'react'

export function DetailsSummary ({ title, children, classList = '' }) {
  const [state, setState] = useState('closed')

  const handleOpen = (ev) => {
    ev.preventDefault()
    const newstate = state === 'open' ? 'closed' : 'open'
    setState(newstate)
    const parentDetails = ev.target.parentElement

    parentDetails.toggleAttribute('open')
    /* codigo para hacer modal el div */
  }

  return (
    <details className={classList}>
      <summary onClick={handleOpen}>{title}</summary>
      {children}
    </details>
  )
}
