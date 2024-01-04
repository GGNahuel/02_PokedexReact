import { useState } from 'react'
import { fixedText } from '../../services/fixText'

export function DetailsFilterElement ({
  title, filterName, inputType, namesArray, hasResetButtonFunc, onChangeFunction
}) {
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
      {inputType === 'radio' && (
        <div>
          <label><input type='radio' name={`${filterName}_filter`} defaultChecked value='all' onChange={onChangeFunction} /> Todas</label>
          {namesArray?.map(name => (
            <label key={name}><input type='radio' name={`${filterName}_filter`} value={name} onChange={onChangeFunction} />
              {fixedText(name)}
            </label>
          ))}
        </div>
      )}
      {inputType === 'checkbox' && (
        <>
          <div>
            {namesArray?.map(name => (
              <label key={name}><input type='checkbox' name={name} onChange={onChangeFunction} />
                {fixedText(name)}
              </label>
            ))}
          </div>
          <div className='filter_buttons_container'>
            <button type='button' onClick={() => { hasResetButtonFunc(filterName) }}>Resetear</button>
          </div>
        </>
      )}
    </details>
  )
}
