export function PageSelector({ getInputValue, inputValue, sendPageSelected }) {

    function updateInputValue(event) {
        let value = event.target.value
        if (value>=0) getInputValue(value);
    }
    
    // function changePage(event) {
    //     event.preventDefault()
    // }

    return (
        <form action="selectPage" onSubmit={ev => {
            ev.preventDefault()
            sendPageSelected()
        }}>
            <input type="number" className="input_page" value={inputValue} onChange={updateInputValue} />
            <button type="submit">Cambiar pagina</button>
        </form>
    )
}