import { useContext } from "react";
import { SearchContext } from "../../context/searchContext";

export function PageSelector() {
    const { resultsDetails, setResultsDetails } = useContext(SearchContext);

    function updateInputValue(event) {
        const value = event.target.value
        setResultsDetails(prevState => ({
            ... prevState,
            page: Number(value)
        }));
    }

    return (
        <form action="selectPage" onSubmit={ev => {
            ev.preventDefault()
        }}>
            <input type="number" className="input_page" value={resultsDetails.page} onChange={updateInputValue} min="0" />
            <button type="submit">Cambiar pagina</button>
        </form>
    )
}