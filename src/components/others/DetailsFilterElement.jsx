import { useState } from 'react'

export function DetailsFilterElement ({ title, children, hasResetButtonType, hasResetButtonFunc }) {
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
    <details className='filter_details'>
      <summary onClick={handleOpen}>{title}</summary>
      <div>
        {children}
      </div>
      {hasResetButtonType &&
        <div className='filter_buttons_container'>
          <button type='button' onClick={() => { hasResetButtonFunc(hasResetButtonType) }}>Resetear</button>
        </div>}
    </details>
  )
}
