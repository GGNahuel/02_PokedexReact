import { useEffect, useState } from 'react'

import { getPokemonSpecie, getPokemonEvolutionChain, getLocationEncounterAreas, getTypeInfo } from '../services/getPokeApis'
import { renameSpecieProps } from '../services/renameObjectProps'

export function useDetailedPokemonInfo ({ locationsURL, speciesURL, elements }) {
  const [detailsObjects, setDetailsObject] = useState({
    damageRelations: [],
    specieData: {},
    evolutionData: null,
    locationAreas: []
  })

  useEffect(() => {
    function generateElementsInfo () {
      const newDamageRelations = []
      elements.forEach(async element => {
        const elementData = await getTypeInfo(element.type.url)
        newDamageRelations.push(elementData)
      })
      setDetailsObject(prev => ({
        ...prev,
        damageRelations: newDamageRelations
      }))
    }
    generateElementsInfo()
  }, [elements])

  useEffect(() => {
    async function generateEvolutionInfo () {
      const specieInfo = await getPokemonSpecie(speciesURL)
      const newSpecieData = await renameSpecieProps(specieInfo)

      const evoChainInfo = await getPokemonEvolutionChain(specieInfo.evolution_chain.url)

      setDetailsObject(prev => ({
        ...prev,
        specieData: newSpecieData,
        evolutionData: evoChainInfo.chain
      }))
    }
    generateEvolutionInfo()
  }, [speciesURL])

  useEffect(() => {
    async function generateLocationAreas () {
      const locations = await getLocationEncounterAreas(locationsURL)
      setDetailsObject(prev => ({
        ...prev,
        locationAreas: locations
      }))
    }
    generateLocationAreas()
  }, [locationsURL])

  return detailsObjects
}
