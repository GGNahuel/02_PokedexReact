import { renameProps } from "../../services/constantes"

export function CardBody({ sprite, elements }) {
    return (
        <>
            <img src={sprite} alt="" className="tarjeta_img" />
            <div className="tarjeta_tipos">
                {elements.map(typeobj => (
                    <p key={typeobj.slot}>{typeobj.type.name}</p>
                ))}
            </div>
        </>
    )
}

export function ExpandedCardBody({dataObj, evolutionElements}) {
    const { stats, weight, height, sprite, elements } = renameProps(dataObj)

    return (
        <>
            <div className="tarjeta_mainInfo">
                <img src={sprite} alt="" className="tarjeta_img" />
                <ul className="tarjeta_stats">
                    {stats.map(statObj => (
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
            <div className="tarjeta_evolutionPath">
                <div className="evolPath_main">
                    {evolutionElements}
                </div>
            </div>
        </>
    )
}