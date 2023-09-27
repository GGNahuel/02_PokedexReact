export function TarjetaPkmn(props) {
    const { name, id, spriteSRC, elements = [], idSelected, toggleSelected } = props;

    const expanded = idSelected === id

    const classes = expanded ? "tarjetaPKMN activa" : "tarjetaPKMN"

    function clickEvent() {
        toggleSelected(id)
    }

    return (
        <article className={classes} id={"pkmn"+id} onClick={clickEvent}>
            <div className="tarjeta_header">
                <h3>{name}</h3>
                <h3>{id}</h3>
            </div>
            <img src={spriteSRC} alt="" className="tarjeta_img" />
            <div className="tarjeta_tipos">
                {elements.map((type, index)=>{
                    <span key={index}>{type}</span>
                })}
            </div>
        </article>
    )
}
