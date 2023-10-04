import { useEffect, useState } from "react";

import { renameProps } from "../services/constantes";
import { getPokemonSpecie, getPokemonEvolutionChain } from "../services/getPokeApis";

import { EvolutionElements } from "./PokemonCard_components/evolutionChain";
import { CardBody, ExpandedCardBody } from "./PokemonCard_components/cardBody";

export function TarjetaPkmn(props) {
    const { dataObj, idSelected, toggleSelected } = props;
    const { name, id, sprite, elements, speciesURL } = renameProps(dataObj)
    const [evolutionElements, setevolutionElements] = useState()

    const expanded = idSelected === id

    const classes = expanded ? "tarjetaPKMN activa" : "tarjetaPKMN"

    function clickEvent() {
        toggleSelected(id)
    }

    useEffect(() => {
        if (!expanded) return

        async function getEvolutionInfo() {
            const specieInfo = await getPokemonSpecie(speciesURL)
            const evoChainInfo = await getPokemonEvolutionChain(specieInfo.evolution_chain.url)
            
            setevolutionElements(<EvolutionElements obj={evoChainInfo.chain} targetName={name} targetSprite={sprite}/>)
        }
        getEvolutionInfo()
    }, [expanded])

    return (
        <>
            <article className={classes} id={"pkmn" + id} onClick={clickEvent}>
                <div className="tarjeta_header">
                    <h3>{name}</h3>
                    <h3>{id}</h3>
                </div>
                <div className="tarjeta_body">
                    {expanded ? <ExpandedCardBody dataObj={dataObj} evolutionElements={evolutionElements} />
                        : <CardBody sprite={sprite} elements={elements} />
                    }
                </div>
            </article>
        </>
    )
}
