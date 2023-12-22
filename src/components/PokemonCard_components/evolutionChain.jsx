import { useEffect, useState } from 'react'

import { renameEvolutionProps, POKEMON_PREFIX_API, renameProps } from '../../services/constantes'
import { getPokemonInfo } from '../../services/getPokeApis'

export function EvolutionElements ({ obj, targetName, targetSprite }) {
  const { nameLink, evolutionDetails, evolvesTo, idLink } = renameEvolutionProps(obj)
  const [spriteSource, setSpriteSource] = useState()
  const [evolutionConditions, setEvolutionCondition] = useState([])

  useEffect(() => {
    if (evolutionDetails.length > 0) {
      const newConditions = []
      for (const key in evolutionDetails[0]) {
        if (evolutionDetails[0][key]) {
          newConditions.push([key, evolutionDetails[0][key]])
        }
      }
      setEvolutionCondition(newConditions)
    }
    // ejemplo de UN elemento de evolutionConditions ["min-level", 16]

    async function defineSpriteSource () {
      if (targetName === nameLink) setSpriteSource(targetSprite)
      else {
        const pokemonInfo = await getPokemonInfo(POKEMON_PREFIX_API + idLink)
        const { sprite } = renameProps(pokemonInfo)
        setSpriteSource(sprite)
      }
    }
    defineSpriteSource()
  }, [])

  return (
    <>
      <p>{nameLink} {idLink}</p>
      <img src={spriteSource} alt='' />
      {evolutionConditions.map(arrayCondition => !arrayCondition[1].name
        ? <p key={arrayCondition[0]}>Condición: {arrayCondition[0]}= {arrayCondition[1]}</p>
        : <p key={arrayCondition[0]}>Condición: {arrayCondition[0]}= {arrayCondition[1].name}</p>
      )}
      {evolvesTo.length > 0 &&
        <div className='evolPath_main'>
          {evolvesTo.map(element => (
            <EvolutionElements key={renameEvolutionProps(element).nameLink} obj={element} />
          ))}
        </div>}
    </>
  )
}
