import { useContext, useState } from 'react'
import { DetailsFilterElement } from '../others/DetailsFilterElement'
import { SearchContext } from '../../context/searchContext'
import { useFilterNodes } from '../../hooks/useFilterNodes'
import { fixedText } from '../../services/fixText'
import { FILTERS_INFO, STATS_FOR_SORTING } from '../../services/constantes'

export function FilterSort () {
  const { resultsDetails, setResultsDetails } = useContext(SearchContext)
  const { filters } = resultsDetails
  const [equalsSelectedTempFilters, setEqualsFilters] = useState(true)

  const { checkboxNames } = useFilterNodes()

  const getSelectedItems = () => {
    const formNode = document.getElementById('filters_sorts')
    const selectedItems = {}

    for (const key in FILTERS_INFO) {
      if (FILTERS_INFO[key].inputType === 'radio') {
        selectedItems[key + 'Selected'] = formNode[key + '_filter'].value
      }
      if (FILTERS_INFO[key].inputType === 'checkbox') {
        selectedItems[key + 'Selected'] = checkboxNames[key + 'Names'].filter(itemName => formNode[itemName].checked && itemName)
      }
    }

    selectedItems.sortSelected = formNode.sortResults.value

    return selectedItems
  }

  const checkSelectedItems = () => {
    const selectedItems = getSelectedItems()

    const sameSort = selectedItems.sortSelected === resultsDetails.sort
    let sameFilters = true
    let sameLength = true
    for (const key in FILTERS_INFO) {
      if ((FILTERS_INFO[key].inputType === 'radio' && selectedItems[key + 'Selected'] !== filters[key]) ||
      (FILTERS_INFO[key].inputType === 'checkbox' && !selectedItems[key + 'Selected'].every((item, index) => item === filters[key][index]))
      ) sameFilters = false
      if (FILTERS_INFO[key].inputType === 'checkbox' && selectedItems[key + 'Selected'].length !== filters[key].length
      ) sameLength = false
    }

    const condition = sameLength && sameFilters && sameSort
    setEqualsFilters(condition)
  }

  const changeForm = (checkboxesToChange) => {
    const formNode = document.getElementById('filters_sorts')

    checkboxNames[checkboxesToChange + 'Names'].forEach(name => {
      formNode[name].checked = false
    })

    checkSelectedItems()
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

    const selectedItems = getSelectedItems()
    const newFilters = {}
    for (const key in FILTERS_INFO) {
      newFilters[key] = selectedItems[key + 'Selected']
    }

    setResultsDetails(prevState => {
      const searchValue = prevState.filters.search
      return ({
        ...prevState,
        filters: {
          search: searchValue,
          ...newFilters
        },
        sort: selectedItems.sortSelected
      })
    })

    setEqualsFilters(true)
  }

  return (
    <form id='filters_sorts' onSubmit={ev => { handleSubmit(ev) }}>
      <details>
        <summary>Filtros:</summary>
        <ul>
          {Object.keys(FILTERS_INFO).map(filterName =>
            <DetailsFilterElement
              key={filterName}
              title={fixedText(filterName)} inputType={FILTERS_INFO[filterName].inputType}
              filterName={filterName} namesArray={checkboxNames[filterName + 'Names']}
              hasResetButtonFunc={changeForm} onChangeFunction={checkSelectedItems}
            />
          )}
        </ul>
      </details>
      <details className='filter_details'>
        <summary>Ordenar por</summary>
        <div>
          <label><input type='radio' name='sortResults' value='default' defaultChecked onChange={checkSelectedItems} /> Por defecto</label>
          <label><input type='radio' name='sortResults' value='name' onChange={checkSelectedItems} /> Alfabeticamente</label>
          <fieldset>
            <legend>Estadística <span className='normal' title='Por cuestiones de rendimiento esto solo ordenará la página actual'>❔</span></legend>
            {STATS_FOR_SORTING.map(statName =>
              <label key={statName}><input type='radio' name='sortResults' value={statName} onChange={checkSelectedItems} />
                {fixedText(statName)}
              </label>
            )}
          </fieldset>
        </div>
      </details>
      <div>
        {!equalsSelectedTempFilters && <p>Hay cambios sin aplicar</p>}
        <button type='submit'>Aplicar Cambios</button>
      </div>
    </form>
  )
}
