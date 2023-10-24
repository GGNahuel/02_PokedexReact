import { useContext } from "react";
import { SearchContext } from "../../context/searchContext";

export function PageSelector() {
    const { resultsDetails, setResultsDetails } = useContext(SearchContext);

    function updateInputValue(event) {
        const value = event.target.value
        setResultsDetails(prevState => ({
            ... prevState,
            pageInput: Number(value),
        }));
    }

    return (
        <form action="selectPage" onSubmit={ev => {
            ev.preventDefault()
            setResultsDetails(prevState => ({
                ... prevState,
                page: Number(ev.target.pageSelector.value),
            }));
        }}>
            <input type="number" name="pageSelector" className="input_page" value={resultsDetails.pageInput} onChange={updateInputValue} min="0" />
            <button type="submit">Cambiar pagina</button>
        </form>
    )
}