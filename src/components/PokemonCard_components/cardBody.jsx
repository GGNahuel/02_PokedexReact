import { renameLocationEncounterAreas, renameProps } from '../../services/renameObjectProps'

import { useDetailedPokemonInfo } from '../../hooks/useDetailedPokemonInfo'

import { TypeTag } from '../others/TypeTag'
import { EvolutionElements } from './evolutionChain'
import { DamageRelationsType } from './DamageRelationsType'
import { LocationEncounterAreas } from './LocationEncounterAreas'
import { fixedText } from '../../services/fixText'

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

const DetailsElements = ({ damageRelations, evolutionData, locationAreas, specieData }) => (
  <>
    <section>
      <h3 className='tarjeta_seccionTitle'>{fixedText('Types info')}</h3>
      <div className='tipos_daños'>
        {damageRelations?.map((type, index) =>
          <DamageRelationsType key={index} dataObj={type} indx={index} />
        )}
      </div>
    </section>
    <section className='tarjeta_evolutionPath'>
      <h3 className='tarjeta_seccionTitle'>{fixedText('Evolution path')}</h3>
      <div className='evolPath_link'>
        {evolutionData && <EvolutionElements obj={evolutionData} />}
      </div>
    </section>
    <section className='tarjeta_datosRegion'>
      <h3 className='tarjeta_seccionTitle'>{fixedText('Pokemon region info')}</h3>
      <p>Originario de la {specieData.generation}</p>
      <p>Su habitat es {specieData.habitat}</p>
      <p>Se encuentra en las pokedexes de:</p>
      <ul>
        {specieData.pokedexNumbers?.map(element => <li key={element.pokedex}>{element.pokedex} en la posicion {element.entry}</li>)}
      </ul>
    </section>
    <section className='tarjeta_lugaresDeObtencion'>
      <h3 className='tarjeta_seccionTitle'>{fixedText('Encounter areas')}</h3>
      {locationAreas.length > 0 ? <p>Lugares de obtención:</p> : <p>Solo se obtiene de forma especial</p>}
      <ul>
        {locationAreas?.map(element => {
          const { location } = renameLocationEncounterAreas(element)
          return <LocationEncounterAreas key={location} dataObjt={element} />
        })}
      </ul>
    </section>
  </>
)

export function ExpandedCardBody ({ dataObj, closeFunction }) {
  const { name, id, stats, weight, height, sprite, alternativeSprite, elements, locationsURL, speciesURL } = renameProps(dataObj)

  const { damageRelations, specieData, evolutionData, locationAreas } = useDetailedPokemonInfo({ locationsURL, speciesURL, elements })

  return (
    <aside id='selected_card'>
      <button type='button' className='jump_btn' onClick={closeFunction}>
        <span className='material-symbols-outlined'>
          close
        </span>
      </button>
      <header className='tarjeta_header'>
        <h3>{name.toUpperCase()}</h3>
        <h3>{id}</h3>
      </header>
      <section className='tarjeta_mainInfo'>
        <img src={sprite || alternativeSprite} alt='' className='tarjeta_img' />
        <div className='tarjeta_stats'>
          {stats.map(statObj => <p key={statObj.stat.name}>{statObj.stat.name}: {statObj.base_stat}</p>)}
          <p>{weight} kg</p>
          <p>{height} cm</p>
        </div>
        <p>{specieData.description}</p>
        {specieData.isLegendary && <span>Legendario</span>}
        {specieData.isMythic && <span>Mitico</span>}
        <div className='tarjeta_tipos'>
          {elements.map(type => (
            <TypeTag key={type.name} type={type.name} />
          ))}
        </div>
      </section>
      <DetailsElements damageRelations={damageRelations} specieData={specieData} locationAreas={locationAreas} evolutionData={evolutionData} />
    </aside>
  )
}
