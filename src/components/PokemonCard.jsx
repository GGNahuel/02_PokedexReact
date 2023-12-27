import { renameProps } from '../services/renameObjectProps'

import { CardBody } from './PokemonCard_components/cardBody'

export function TarjetaPkmn (props) {
  const { dataObj, idSelected, toggleSelected } = props
  const { name, id, sprite, alternativeSprite, elements } = renameProps(dataObj)

  const expanded = idSelected === id

  const classes = expanded ? 'tarjetaPKMN activa' : 'tarjetaPKMN'

  function clickEvent () {
    toggleSelected(id, dataObj)
  }

  return (
    <>
      <article className={classes} id={'pkmn' + id} onClick={clickEvent}>
        <div className='tarjeta_header'>
          <h3>{name.toUpperCase()}</h3>
          <h3>{id}</h3>
        </div>
        <div className='tarjeta_body'>
          <CardBody sprite={sprite} elements={elements} alternativeSprite={alternativeSprite} />
        </div>
      </article>
    </>
  )
}
