import { renameProps } from "../../services/constantes"

import { useEvolutionChainGenerator } from "../../hooks/useEvolutionChainGenerator"
import { useTypeInfoGenerator } from "../../hooks/useTypeInfoGenerator"
import { useLocationEncounterAreasGenerator } from "../../hooks/useLocationEncounterAreasGenerator"

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

export function ExpandedCardBody({ dataObj }) {
    const { stats, weight, height, sprite, elements, locationsURL } = renameProps(dataObj)

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
                <div className="tipos_daños">
                    {useTypeInfoGenerator(elements)}
                </div>
            </div>
            <div className="tarjeta_evolutionPath">
                <div className="evolPath_main">
                    {useEvolutionChainGenerator(dataObj)}
                </div>
            </div>
            <ul className="tarjeta_lugaresDeObtencion">
                <p>Lugares de obtención:</p>
                {useLocationEncounterAreasGenerator({ locationsURL: locationsURL })}
            </ul>
        </>
    )
}