import { useState } from "react";

export function TarjetaPkmn(props) {
    const { name, id, spriteSRC, elements=[] } = props;

    const [ expanded, setExpandState ] = useState(false)
    // intntar con el lifting state up
    const classes = expanded ? "tarjetaPKMN activa" : "tarjetaPKMN"

    function getDetailedInfo(){
        setExpandState(!expanded)
    }
    
    return (
        <article className={classes} id={"pkmn"+id} onClick={getDetailedInfo}>
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
