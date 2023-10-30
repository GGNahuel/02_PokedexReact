import { useEffect, useState } from 'react'
import { DetailsSummary } from './DetailsSummary'

export function FilterSort () {
  const [filterList, setFilterList] = useState({
    generation: [],
    pokedex: [],
    elements: []
  })

  useEffect(() => {
    async function getFilterList () {
      const SUFIX_LIMIT_API = '?limit=100/'
      try {
        const apiGenerations = await fetch('https://pokeapi.co/api/v2/generation/' + SUFIX_LIMIT_API)
        const dataGenerations = await apiGenerations.json()
        const generations = dataGenerations.results.map(generation => generation.name)
        setFilterList(prevState => ({
          ...prevState,
          generation: generations
        }))

        const apiPokedex = await fetch('https://pokeapi.co/api/v2/pokedex/' + SUFIX_LIMIT_API)
        const dataPokedex = await apiPokedex.json()
        const pokedexes = dataPokedex.results.map(pokedex => pokedex.name)
        setFilterList(prevState => ({
          ...prevState,
          pokedex: pokedexes
        }))

        const apiTypes = await fetch('https://pokeapi.co/api/v2/type/' + SUFIX_LIMIT_API)
        const dataTypes = await apiTypes.json()
        const types = dataTypes.results.map(element => element.name.toUpperCase())
        setFilterList(prevState => ({
          ...prevState,
          elements: types
        }))
      } catch (error) {
        console.log('error con los filtros de generacion')
      }
    } getFilterList()
  }, [])

  function handleSubmit (ev) {
    ev.preventDefault()
    console.log('Submit')
  }

  return (
    <form
      id='filters_sorts' onSubmit={ev => {
        handleSubmit(ev)
      }}
    >
      <div>
        <button type='submit'>Aplicar Cambios</button>
        <button type='button'>Resetear</button>
      </div>
      <details>
        <summary>Filtros:</summary>
        <ul>
          <DetailsSummary classList='filter_details' title='Generación'>
            <label><input type='radio' name='generation_filter' /> None</label>
            {filterList.generation.map(generation => (
              <label key={generation}><input type='radio' name='generation_filter' value={generation} /> {generation}</label>
            ))}
          </DetailsSummary>
          <DetailsSummary classList='filter_details' title='Pokedex'>
            {filterList.pokedex.map(pokedexName => (
              <label key={pokedexName}><input type='checkbox' name='pokedex_filter' /> {pokedexName}</label>
            ))}
          </DetailsSummary>
          <DetailsSummary classList='filter_details' title='Elementos'>
            {filterList.elements.map(type => (
              <label key={type}><input type='checkbox' name='type_filter' /> {type}</label>
            ))}
          </DetailsSummary>
        </ul>
      </details>
      <details>
        <summary>Ordenar por</summary>
        <label><input type='radio' name='sortResults' /> Alfabeticamente</label>
        <label><input type='radio' name='sortResults' /> Índice</label>
        <label><input type='radio' name='sortResults' /> Hp</label>
      </details>
    </form>
  )
}
