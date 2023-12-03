import { useState, useEffect } from 'react'
import { getTypeInfo } from '../services/getPokeApis'
import { renameTypeProps } from '../services/constantes'
import { DamageRelationsType } from '../components/PokemonCard_components/DamageRelationsType'

export function useTypeInfoGenerator (elements) {
  const [damageRelations, setDamageRelations] = useState([])

  useEffect(() => {
    function generateElementsInfo () {
      const newDamageRelations = []
      elements.forEach(async element => {
        const elementData = await getTypeInfo(element.type.url)

        const { baseElement } = renameTypeProps(elementData)
        newDamageRelations.push(<DamageRelationsType key={baseElement} dataObj={elementData} />)
      })

      setDamageRelations(newDamageRelations)
    }
    generateElementsInfo()
  }, [])

  return damageRelations
}
