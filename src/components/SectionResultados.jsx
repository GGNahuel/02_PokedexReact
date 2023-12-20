import { useState } from 'react'
import { usePokemonsGenerator } from '../hooks/usePokemonsGenerator'
import { TarjetaPkmn } from './PokemonCard'
import { ExpandedCardBody } from './PokemonCard_components/cardBody'
import { LoadingComponent } from './LoadingComponent'

export function SectionResultados () {
  const [tarjetaExpandida, setTarjetaExpandida] = useState(null)
  const [dataObjSelected, setDataObjSelected] = useState(null)

  const { pkmns, isLoading } = usePokemonsGenerator()

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
    <section id='pokemonSection'>
      <section id='pokeResultados'>
        {pkmns.length === 0 && !isLoading && <div>No se han encontrado resultados, prueba cambiando su búsqueda o los filtros</div>}
        {!isLoading
          ? pkmns.map(dataPkmn => (
            <TarjetaPkmn
              key={dataPkmn.id}
              dataObj={dataPkmn}
              idSelected={tarjetaExpandida}
              toggleSelected={toggleSelected}
            />)
          )
          : <LoadingComponent />}
      </section>
      {dataObjSelected && <ExpandedCardBody dataObj={dataObjSelected} />}
    </section>
  )
}
