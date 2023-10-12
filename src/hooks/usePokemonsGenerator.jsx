import { useEffect, useState } from "react";
import { getNationalPokedex, getPokemonInfo } from "../services/getPokeApis";

export function usePokemonsGenerator({page, searchValue}) {
    const [pkmns, addPkmns] = useState([])
    const [mainResults, setMainResults] = useState([])
    const [currentResults, setCurrentResults] = useState([])

    page = Number(page * 20)

    async function generatePokeElements(pokeArray) {
        const pokeElements = []
        for (let pkmn = page; pkmn < page + 20; pkmn++) {
            if (pokeArray[pkmn]) {
                const dataPkmn = await getPokemonInfo(pokeArray[pkmn].url)
                pokeElements.push(dataPkmn)
            }
        }
        addPkmns(pokeElements)
    }

    useEffect(() => {
        async function generateContent() {
            if (mainResults.length == 0) {
                const { results } = await getNationalPokedex()
                setMainResults(results)
                setCurrentResults(results)
                generatePokeElements(results)
            }

            if (mainResults.length > 0) {
                generatePokeElements(currentResults)
            }
        }
        generateContent()
    }, [page])

    useEffect(()=>{
        if  (!searchValue && mainResults.length > 0) {
            const tempMainResults = mainResults
            setCurrentResults(tempMainResults)
            generatePokeElements(tempMainResults)
            return
        }

        if(mainResults.length>0){
            const regExpSearch = new RegExp (searchValue)
            let searchResults = []
            if(Number(searchValue)) {
                searchResults.push(mainResults[searchValue-1])
            }else searchResults=mainResults.filter(element => regExpSearch.test(element.name))
            setCurrentResults(searchResults)
            generatePokeElements(searchResults)
        }
    }, [searchValue])

    return pkmns
}
