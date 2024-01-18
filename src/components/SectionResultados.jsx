import { useState } from 'react'
import { usePokemonsGenerator } from '../hooks/usePokemonsGenerator'
import { TarjetaPkmn } from './PokemonCard'
import { ExpandedCardBody } from './PokemonCard_components/cardBody'
import { LoadingComponent } from './others/LoadingComponent'

export function SectionResultados () {
  const [tarjetaExpandida, setTarjetaExpandida] = useState(null)
  const [objSelectedData, setObjSelectedData] = useState(null)

  const { pkmns, isLoading } = usePokemonsGenerator()

  function toggleSelected (id, dataObj) {
    if (tarjetaExpandida === id) {
      setTarjetaExpandida(null)
      setObjSelectedData(null)
    } else {
      setTarjetaExpandida(id)
      setObjSelectedData(dataObj)
    }
  }

  return (
    <section id='pokemonSection'>
      <section id='pokeResultados'>
        {pkmns.length === 0 && !isLoading && <p>No se han encontrado resultados, prueba cambiando su búsqueda o los filtros</p>}
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
      {objSelectedData &&
        <ExpandedCardBody
          dataObj={objSelectedData} closeFunction={() => { setTarjetaExpandida(null); setObjSelectedData(null) }}
        />}
    </section>
  )
}
