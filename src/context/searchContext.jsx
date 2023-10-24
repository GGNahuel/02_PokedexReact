import { createContext, useState } from "react";

export const SearchContext = createContext()

export function SearchContextProvider({ children }) {
    const [resultsDetails, setResultsDetails] = useState({
        search: null,
        page: 0,
        pageInput: 0,
        filters: {
            generation: undefined,
            pokedex: undefined,
            elements: []
        },
        sort: ""
    })

    return (
        <SearchContext.Provider value={{
            resultsDetails, setResultsDetails
        }}>
            {children}
        </SearchContext.Provider>
    )
}