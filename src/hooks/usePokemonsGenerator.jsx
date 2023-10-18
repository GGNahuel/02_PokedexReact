import { useEffect, useState } from "react";
import { getNationalPokedex } from "../services/getPokeApis";
import { generatePokeElements } from "../services/generatePokeElements";

export function usePokemonsGenerator({page, searchValue}) {
    const [pkmns, setPkmns] = useState([])
    const [mainResults, setMainResults] = useState([])
    const [currentResults, setCurrentResults] = useState([])

    page = Number(page * 20)

    useEffect(() => {
        async function generateContent() {
            if (mainResults.length == 0) {
                const { results } = await getNationalPokedex()
                setMainResults(results)
                setCurrentResults(results)
                setPkmns(generatePokeElements(results))
            }

            if (mainResults.length > 0) {
                setPkmns(generatePokeElements(currentResults))
            }
        }
        generateContent()
    }, [page])

    useEffect(()=>{
        if  (!searchValue && mainResults.length > 0) {
            const tempMainResults = mainResults
            setCurrentResults(tempMainResults)
            setPkmns(generatePokeElements(tempMainResults))
            return
        }

        if(mainResults.length>0){
            const regExpSearch = new RegExp (searchValue)
            let searchResults = []
            if(Number(searchValue)) {
                searchResults.push(mainResults[searchValue-1])
            }else searchResults=mainResults.filter(element => regExpSearch.test(element.name))
            setCurrentResults(searchResults)
            setPkmns(generatePokeElements(searchResults))
        }
    }, [searchValue])

    return pkmns
}
