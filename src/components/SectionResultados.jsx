import { useState } from 'react'
import { usePokemonsGenerator } from '../hooks/usePokemonsGenerator'
import { TarjetaPkmn } from './PokemonCard'
import { ExpandedCardBody } from './PokemonCard_components/cardBody'

export function SectionResultados () {
  const [tarjetaExpandida, setTarjetaExpandida] = useState(null)
  const [dataObjSelected, setDataObjSelected] = useState(null)

  function toggleSelected (id, dataObj) {
    if (tarjetaExpandida === id) {
      setTarjetaExpandida(null)
      setDataObjSelected(null)
    } else {
      setTarjetaExpandida(id)
      setDataObjSelected(dataObj)
    }
  }

  return (
    <>
      <section id='pokeResultados'>
        {usePokemonsGenerator().map(dataPkmn => (
          <TarjetaPkmn
            key={dataPkmn.id}
            dataObj={dataPkmn}
            idSelected={tarjetaExpandida}
            toggleSelected={toggleSelected}
          />)
        )}
      </section>
      {dataObjSelected && <ExpandedCardBody dataObj={dataObjSelected} />}
    </>
  )
}
