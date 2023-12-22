import { useEffect, useState } from 'react'
import { getTypeInfo } from '../services/getPokeApis'

export function useTypeInfoGenerator ({ elements }) {
  const [damageRelations, setDamageRelations] = useState([])

  useEffect(() => {
    function generateElementsInfo () {
      const newDamageRelations = []
      elements.forEach(async element => {
        const elementData = await getTypeInfo(element.type.url)
        newDamageRelations.push(elementData)
      })
      setDamageRelations(newDamageRelations)
    }
    generateElementsInfo()
  }, [elements])

  return { damageRelations }
}
