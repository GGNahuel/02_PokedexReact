import { renameLocationEncounterAreas, renameProps } from '../../services/constantes'

import { useDetailedPokemonInfo } from '../../hooks/useDetailedPokemonInfo'

import { TypeTag } from '../others/TypeTag'
import { EvolutionElements } from './evolutionChain'
import { DamageRelationsType } from './DamageRelationsType'
import { LocationEncounterAreas } from './LocationEncounterAreas'

export function CardBody ({ sprite, alternativeSprite, elements }) {
  return (
    <>
      <img src={sprite || alternativeSprite} alt='No hay imagen disponible del pokemon :c' className='tarjeta_img' loading='lazy' />
      <div className='tarjeta_tipos'>
        {elements.map(typeobj => (
          <TypeTag key={typeobj.slot} type={typeobj.type.name} />
        ))}
      </div>
    </>
  )
}

export function ExpandedCardBody ({ dataObj }) {
  const { name, id, stats, weight, height, sprite, alternativeSprite, elements, locationsURL, speciesURL } = renameProps(dataObj)

  const { damageRelations, specieData, evolutionData, locationAreas } = useDetailedPokemonInfo({ locationsURL, speciesURL, elements })

  const DetailsElements = () => (
    <>
      <div className='tarjeta_tipos'>
        {elements.map(typeobj => (
          <TypeTag key={typeobj.slot} type={typeobj.type.name} />
        ))}
        <div className='tipos_daños'>
          {damageRelations?.map((type, index) =>
            <DamageRelationsType key={index} dataObj={type} indx={index} />
          )}
        </div>
      </div>
      <div className='tarjeta_evolutionPath'>
        <div className='evolPath_main'>
          {evolutionData && <EvolutionElements obj={evolutionData} targetName={name} targetSprite={sprite} />}
        </div>
      </div>
      <div className='tarjeta_datosRegion'>
        <p>Originario de la {specieData.generation}</p>
        <p>Su habitat es {specieData.habitat}</p>
        <ul> Se encuentra en las pokedexes de:
          {specieData.pokedexNumbers?.map(element => <li key={element.pokedex}>{element.pokedex} en la posicion {element.entry}</li>)}
        </ul>
      </div>
      <ul className='tarjeta_lugaresDeObtencion'>
        <p>Lugares de obtención:</p>
        {locationAreas?.map(element => {
          const { location } = renameLocationEncounterAreas(element)
          return <LocationEncounterAreas key={location} dataObjt={element} />
        })}
      </ul>
    </>
  )

  return (
    <aside id='selected_card'>
      <header className='tarjeta_header'>
        <h3>{name.toUpperCase()}</h3>
        <h3>{id}</h3>
      </header>
      <div className='tarjeta_mainInfo'>
        <img src={sprite || alternativeSprite} alt='' className='tarjeta_img' />
        <ul className='tarjeta_stats'>
          {stats.map(statObj => <li key={statObj.stat.name}>{statObj.stat.name}: {statObj.base_stat}</li>)}
          <li>{weight} kg</li>
          <li>{height} cm</li>
        </ul>
        <p>{specieData.description}</p>
        {specieData.isLegendary && <span>Legendario</span>}
        {specieData.isMythic && <span>Mitico</span>}
      </div>
      <DetailsElements />
    </aside>
  )
}
