import { renameProps } from "../services/constantes";

import { useEvolutionChainGenerator } from "../hooks/useEvolutionChainGenerator";
import { CardBody, ExpandedCardBody } from "./PokemonCard_components/cardBody";

export function TarjetaPkmn(props) {
    const { dataObj, idSelected, toggleSelected } = props;
    const { name, id, sprite, elements } = renameProps(dataObj)

    const expanded = idSelected === id

    const classes = expanded ? "tarjetaPKMN activa" : "tarjetaPKMN"

    function clickEvent() {
        toggleSelected(id)
    }

    return (
        <>
            <article className={classes} id={"pkmn" + id} onClick={clickEvent}>
                <div className="tarjeta_header">
                    <h3>{name}</h3>
                    <h3>{id}</h3>
                </div>
                <div className="tarjeta_body">
                    {expanded ? 
                        <ExpandedCardBody dataObj={dataObj} />
                        : <CardBody sprite={sprite} elements={elements} />
                    }
                </div>
            </article>
        </>
    )
}
