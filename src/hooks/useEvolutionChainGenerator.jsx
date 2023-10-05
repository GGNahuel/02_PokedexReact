import { useEffect, useState } from "react"
import { getPokemonSpecie, getPokemonEvolutionChain } from "../services/getPokeApis"
import { EvolutionElements } from "../components/PokemonCard_components/evolutionChain"
import { renameProps } from "../services/constantes"

export function useEvolutionChainGenerator({expanded, dataObj}) {
    const [evolutionElements, setevolutionElements] = useState()
    const {name, sprite, speciesURL} = renameProps(dataObj)
    
    useEffect(() => {
        if (!expanded) return

        async function getEvolutionInfo() {
            const specieInfo = await getPokemonSpecie(speciesURL)
            const evoChainInfo = await getPokemonEvolutionChain(specieInfo.evolution_chain.url)

            setevolutionElements(
                <EvolutionElements obj={evoChainInfo.chain} targetName={name} targetSprite={sprite} />
            )
        }
        getEvolutionInfo()
    }, [expanded])
    
    return evolutionElements
}