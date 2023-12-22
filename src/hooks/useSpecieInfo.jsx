import { useEffect, useState } from 'react'
import { getPokemonSpecie, getPokemonEvolutionChain } from '../services/getPokeApis'
import { renameSpecieProps } from '../services/constantes'

export function useSpecieInfo ({ speciesURL }) {
  const [evolutionElement, setevolutionElements] = useState()
  const [specieData, setSpeciaData] = useState({})

  useEffect(() => {
    async function generateEvolutionInfo () {
      const specieInfo = await getPokemonSpecie(speciesURL)
      const newSpecieData = renameSpecieProps(specieInfo)
      setSpeciaData(newSpecieData)

      const evoChainInfo = await getPokemonEvolutionChain(specieInfo.evolution_chain.url)
      setevolutionElements(evoChainInfo.chain)
    }
    generateEvolutionInfo()
  }, [speciesURL])

  return { evolutionElement, specieData }
}
