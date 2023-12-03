import { renameProps } from '../../services/constantes'

import { useEvolutionChainGenerator } from '../../hooks/useEvolutionChainGenerator'
import { useTypeInfoGenerator } from '../../hooks/useTypeInfoGenerator'
import { useLocationEncounterAreasGenerator } from '../../hooks/useLocationEncounterAreasGenerator'

import { TypeTag } from './TypeTag'

export function CardBody ({ sprite, elements }) {
  return (
    <>
      <img src={sprite} alt='' className='tarjeta_img' />
      <div className='tarjeta_tipos'>
        {elements.map(typeobj => (
          <TypeTag key={typeobj.slot} type={typeobj.type.name} />
        ))}
      </div>
    </>
  )
}

export function ExpandedCardBody ({ dataObj }) {
  const { stats, weight, height, sprite, elements, locationsURL } = renameProps(dataObj)

  const DetailsElements = () => (
    <>
      <div className='tarjeta_tipos'>
        {elements.map(typeobj => (
          <TypeTag key={typeobj.slot} type={typeobj.type.name} />
        ))}
        <div className='tipos_daños'>
          {useTypeInfoGenerator(elements)}
        </div>
      </div>
      <div className='tarjeta_evolutionPath'>
        <div className='evolPath_main'>
          {useEvolutionChainGenerator(dataObj)}
        </div>
      </div>
      <ul className='tarjeta_lugaresDeObtencion'>
        <p>Lugares de obtención:</p>
        {useLocationEncounterAreasGenerator({ locationsURL })}
      </ul>
    </>
  )

  return (
    <aside id='selected_card'>
      <div className='tarjeta_mainInfo'>
        <img src={sprite} alt='' className='tarjeta_img' />
        <ul className='tarjeta_stats'>
          {stats.map(statObj => (
            <li key={statObj.stat.name}>{statObj.stat.name}: {statObj.base_stat}</li>
          ))}
          <li>{weight} kg</li>
          <li>{height} cm</li>
        </ul>
      </div>
      <DetailsElements />
    </aside>
  )
}
