import { renameLocationEncounterAreas, renameProps, renameTypeProps } from "../../services/constantes"
import { DamageRelationsType } from "./DamageRelationsType"
import { useTypeInfoGenerator } from "../../hooks/useTypeInfoGenerator"
import { useEvolutionChainGenerator } from "../../hooks/useEvolutionChainGenerator"
import { useEffect, useState } from "react"
import { getLocationEncounterAreas } from "../../services/getPokeApis"

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
    const [locationAreas, setLocationAreas] = useState([])

    function LocationEncounterAreas({ dataObjt }) {
        const { location, versionDetails, versionNames, maxChances, encounterDetails } = renameLocationEncounterAreas(dataObjt)
        return (
            <div>
                <p>Lugar de encuentro: {location}</p>
                <div style={{ paddingLeft: "1em" }}>
                    {versionDetails.map((_, indicePadre) => (
                        <>
                            <p>Juego: Pokemon {versionNames[indicePadre]}</p>
                            <p>Chance de aparición: {maxChances[indicePadre]}%</p>
                            <p>Metodo/s de obtención:
                                {encounterDetails[indicePadre].map((element, index, array) => {
                                    if (index > 0 && element.method.name == array[index - 1].method.name) return ""

                                    return (
                                        <>
                                            <p style={{ paddingLeft: "1em" }}>
                                                {element.method.name + " "}
                                                {element.condition_values.length > 0 &&
                                                    "condición:" + element.condition_values.map(condition => condition.name)
                                                }
                                            </p>
                                            <p>Nivel de aparición: {element.min_level}
                                                {element.max_level!=element.min_level && " a "+element.max_level}
                                            </p>
                                        </>
                                    )
                                })}
                            </p>
                            <br />
                        </>
                    ))}
                </div>
                <br />
            </div>
        )
    }

    useEffect(() => {
        async function generateLocationAreas() {
            const locations = await getLocationEncounterAreas(locationsURL)
            setLocationAreas(locations)
        }
        generateLocationAreas()
    }, [])

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
                    {useTypeInfoGenerator(elements).map(element => {
                        const { baseElement } = renameTypeProps(element)
                        return (
                            <DamageRelationsType key={baseElement} dataObj={element} />
                        )
                    })}
                </div>
            </div>
            <div className="tarjeta_evolutionPath">
                <div className="evolPath_main">
                    {useEvolutionChainGenerator(dataObj)}
                </div>
            </div>
            <div className="tarjeta_lugaresDeObtencion">
                {locationAreas.map(element => {
                    const { location } = renameLocationEncounterAreas(element)
                    return (
                        <LocationEncounterAreas key={location} dataObjt={element} />
                    )
                })}
            </div>
        </>
    )
}