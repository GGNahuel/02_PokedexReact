import { useEffect, useState } from 'react'
import { FILTERS_INFO, PREFIX_API } from '../services/constantes'

const SUFIX_LIMIT_API = '?limit=100/'

export function useFilterNodes () {
  const [checkboxNames, setCheckboxNames] = useState({})

  useEffect(() => {
    async function getFilterList () {
      try {
        for (const key in FILTERS_INFO) {
          const apiData = await fetch(PREFIX_API + FILTERS_INFO[key].urlSufix + SUFIX_LIMIT_API)
          const data = await apiData.json()
          const arrayOfNames = data.results.map(element => element.name)

          const newCheckboxNames = checkboxNames
          newCheckboxNames[key + 'Names'] = arrayOfNames
          setCheckboxNames(newCheckboxNames)
        }
      } catch (error) {
        console.log('error con los filtros de generacion' + error)
      }
    } getFilterList()
  }, [])

  return { checkboxNames }
}
