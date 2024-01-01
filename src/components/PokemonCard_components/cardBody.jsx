import { renameLocationEncounterAreas, renameProps } from '../../services/renameObjectProps'

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
        {elements.map(type => (
          <TypeTag key={type.name} type={type.name} />
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
        {elements.map(type => (
          <TypeTag key={type.name} type={type.name} />
        ))}
        <div className='tipos_daños'>
          {damageRelations?.map((type, index) =>
            <DamageRelationsType key={index} dataObj={type} indx={index} />
          )}
        </div>
      </div>
      <div className='tarjeta_evolutionPath'>
        <div className='evolPath_main'>
          {evolutionData && <EvolutionElements obj={evolutionData} />}
        </div>
      </div>
      <div className='tarjeta_datosRegion'>
        <p>Originario de la {specieData.generation}</p>
        <p>Su habitat es {specieData.habitat}</p>
        <p>Se encuentra en las pokedexes de:</p>
        <ul>
          {specieData.pokedexNumbers?.map(element => <li key={element.pokedex}>{element.pokedex} en la posicion {element.entry}</li>)}
        </ul>
      </div>
      {locationAreas.length > 0 && <p>Lugares de obtención:</p>}
      <ul className='tarjeta_lugaresDeObtencion'>
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
        <div className='tarjeta_stats'>
          {stats.map(statObj => <p key={statObj.stat.name}>{statObj.stat.name}: {statObj.base_stat}</p>)}
          <p>{weight} kg</p>
          <p>{height} cm</p>
        </div>
        <p>{specieData.description}</p>
        {specieData.isLegendary && <span>Legendario</span>}
        {specieData.isMythic && <span>Mitico</span>}
      </div>
      <DetailsElements />
    </aside>
  )
}
