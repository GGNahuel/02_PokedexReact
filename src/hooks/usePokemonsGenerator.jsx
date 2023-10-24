import { useEffect, useState, useContext } from "react";
import { SearchContext } from "../context/searchContext";
import { getNationalPokedex, getPokemonInfo } from "../services/getPokeApis";
//import { generatePokeElements } from "../services/generatePokeElements";

export function usePokemonsGenerator() {
    const { resultsDetails } = useContext(SearchContext);
    const { page, search } = resultsDetails;

    const [pkmns, setPkmns] = useState([])
    const [mainResults, setMainResults] = useState([])
    const [currentResults, setCurrentResults] = useState([])

    let indexPkmn = page * 20

    async function generatePokeElements(pokeArray) {
        const pokeElements = []
        for (let pkmn = indexPkmn; pkmn < indexPkmn + 20; pkmn++) {
            if (pokeArray[pkmn]) {
                const dataPkmn = await getPokemonInfo(pokeArray[pkmn].url)
                pokeElements.push(dataPkmn)
            }
        }
        setPkmns(pokeElements) 
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
        if  (!search && mainResults.length > 0) {
            const tempMainResults = mainResults
            setCurrentResults(tempMainResults)
            generatePokeElements(tempMainResults)
            return
        }

        if(mainResults.length>0){
            const regExpSearch = new RegExp (search)
            let searchResults = []
            if(Number(search)) {
                searchResults.push(mainResults[search-1])
            }else searchResults=mainResults.filter(element => regExpSearch.test(element.name))
            setCurrentResults(searchResults)
            generatePokeElements(searchResults)
        }
    }, [search])

    return pkmns
}
