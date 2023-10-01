import { renameProps } from "../services/pokeApiProps";

export function TarjetaPkmn(props) {
    const { dataObj, idSelected, toggleSelected } = props;
    const { name, id, sprite, elements, stats, weight, height } = renameProps(dataObj)

    const expanded = idSelected === id

    const classes = expanded ? "tarjetaPKMN activa" : "tarjetaPKMN"

    function clickEvent() {
        toggleSelected(id)
    }

    const Card = () => (
        <article className={classes} id={"pkmn" + id} onClick={clickEvent}>
            <div className="tarjeta_header">
                <h3>{name}</h3>
                <h3>{id}</h3>
            </div>
            <img src={sprite} alt="" className="tarjeta_img" />
            <div className="tarjeta_tipos">
                {elements.map(typeobj => (
                    <p key={typeobj.slot}>{typeobj.type.name}</p>
                ))}
            </div>
        </article>
    )

    const ExpandedCard = () => (
        <article className={classes} id={"pkmn" + id} onClick={clickEvent}>
            <div className="tarjeta_header">
                <h3>{name}</h3>
                <h3>{id}</h3>
            </div>
            <div className="tarjeta_body">
                <div className="tarjeta_body_mainInfo">
                    <img src={sprite} alt="" className="tarjeta_img" />
                    <ul className="tarjeta_stats">
                        {stats.map(statObj =>(
                            <li key={statObj.stat.name}>{statObj.stat.name}: {statObj.base_stat}</li>
                        ))}
                        <li>{weight} kg</li>
                        <li>{height} cm</li>
                    </ul>
                </div>
                <div className="tarjeta_tipos">
                    {elements.map(typeobj => (
                        <p key={typeobj.slot}>{typeobj.type.name}</p>
                    ))}
                </div>
            </div>
        </article>
    )

    return (
        <>
            {expanded ? <ExpandedCard /> : <Card />}
        </>
    )
}
