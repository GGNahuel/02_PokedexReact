import { useEffect, useState } from "react";
import { renameProps, renameEvolutionProps, regExtractID } from "../services/constantes";
import { getPokemonSpecie, getPokemonEvolutionChain } from "../services/getPokeApis";

export function TarjetaPkmn(props) {
    const { dataObj, idSelected, toggleSelected } = props;
    const { name, id, sprite, elements, stats, weight, height, speciesURL } = renameProps(dataObj)
    const [evolChain, setEvolChain] = useState()

    const expanded = idSelected === id

    const classes = expanded ? "tarjetaPKMN activa" : "tarjetaPKMN"

    function clickEvent() {
        toggleSelected(id)
    }

    useEffect(() => {
        if (!expanded) return

        function generateEvolutionElements(obj) {
            const { nameLink, evolutionDetails, evolvesTo } = renameEvolutionProps(obj)

            let evolutionConditions = []
            if (evolutionDetails.length > 0) {
                for (const key in evolutionDetails[0]) {
                    if (evolutionDetails[0][key]) {
                        evolutionConditions.push([key, evolutionDetails[0][key]])
                    }
                }
            }
            console.log(evolutionConditions)

            return (
                <>
                    <p>{nameLink}</p>
                    {evolutionConditions.map(arrayCondition => {
                        if (!arrayCondition[1].name) {
                            return (
                                <p>Condición para evoluionar: {arrayCondition[0]}= {arrayCondition[1]}</p>
                            )
                        }else return (
                            <p>Condición para evoluionar: {arrayCondition[0]}= {arrayCondition[1].name}</p>
                        )
                    }
                    )}
                    {evolvesTo.length > 0 ? generateEvolutionElements(evolvesTo[0]) : ""}
                </>
            )
        }

        async function getEvolutionInfo() {
            const specieInfo = await getPokemonSpecie(speciesURL)
            const evoChainInfo = await getPokemonEvolutionChain(specieInfo.evolution_chain.url)

            const evolProps = [] // array de objs que contendran cada eslabon de la cadena(cada "evolves_to")
            console.log(generateEvolutionElements(evoChainInfo.chain))

            setEvolChain(generateEvolutionElements(evoChainInfo.chain))
        }
        getEvolutionInfo()
    }, [expanded])

    const Card = () => (
        <>
            <img src={sprite} alt="" className="tarjeta_img" />
            <div className="tarjeta_tipos">
                {elements.map(typeobj => (
                    <p key={typeobj.slot}>{typeobj.type.name}</p>
                ))}
            </div>
        </>
    )

    const ExpandedCard = () => (
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
                {evolChain}
            </div>
        </>
    )

    return (
        <>
            <article className={classes} id={"pkmn" + id} onClick={clickEvent}>
                <div className="tarjeta_header">
                    <h3>{name}</h3>
                    <h3>{id}</h3>
                </div>
                <div className="tarjeta_body">
                    {expanded ? <ExpandedCard /> : <Card />}
                </div>
            </article>
        </>
    )
}
