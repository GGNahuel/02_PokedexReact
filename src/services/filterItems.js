import { FILTERS_INFO } from './constantes'

export const getSelectedItems = (checkboxNames) => {
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

  return { selectedItems }
}

export const checkItemsAreEqualsWithCurrent = (resultsDetails, checkboxNames) => {
  const { filters, sort } = resultsDetails
  const { selectedItems } = getSelectedItems(checkboxNames)

  const sameSort = selectedItems.sortSelected === sort
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

  return condition
}
