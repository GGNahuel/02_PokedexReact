/* eslint-disable react/jsx-closing-tag-location */
import { renameTypeProps } from '../../services/constantes'
import { TypeTag } from '../others/TypeTag'

export function DamageRelationsType ({ dataObj, indx }) {
  const { baseElement, x2DmgFrom, x2DmgTo, halfDmgFrom, halfDmgTo, noDmgFrom, noDmgTo } = renameTypeProps(dataObj)
  return (
    <>
      <h3 className={`type_title${indx}`}>{baseElement}</h3>
      {x2DmgFrom.length > 0 && (<div className={`type_x2DmgFrom${indx}`}>
        <p><strong>Recibe doble daño de:</strong></p>
        <div className='typeTags_container'>
          {x2DmgFrom.map(element => (
            <TypeTag key={element.name} type={element.name} />
          ))}
        </div>
      </div>)}

      {x2DmgTo.length > 0 && (<div className={`type_x2DmgTo${indx}`}>
        <p><strong>Super eficaz contra:</strong></p>
        <div className='typeTags_container'>
          {x2DmgTo.map(element => (
            <TypeTag key={element.name} type={element.name} />
          ))}
        </div>
      </div>)}

      {halfDmgFrom.length > 0 && (<div className={`type_halfDmgFrom${indx}`}>
        <p><strong>Recibe Menos daño de:</strong></p>
        <div className='typeTags_container'>
          {halfDmgFrom.map(element => (
            <TypeTag key={element.name} type={element.name} />
          ))}
        </div>
      </div>)}

      {halfDmgTo.length > 0 && (<div className={`type_halfDmgTo${indx}`}>
        <p><strong>No es muy eficaz contra:</strong></p>
        <div className='typeTags_container'>
          {halfDmgTo.map(element => (
            <TypeTag key={element.name} type={element.name} />
          ))}
        </div>
      </div>)}

      {noDmgFrom.length > 0 && (<div className={`type_noDmgFrom${indx}`}>
        <p><strong>Daño nulo de:</strong></p>
        <div className='typeTags_container'>
          {noDmgFrom.map(element => (
            <TypeTag key={element.name} type={element.name} />
          ))}
        </div>
      </div>)}

      {noDmgTo.length > 0 && (<div className={`type_noDmgTo${indx}`}>
        <p><strong>Daño nulo hacia:</strong></p>
        <div className='typeTags_container'>
          {noDmgTo.map(element => (
            <TypeTag key={element.name} type={element.name} />
          ))}
        </div>
      </div>)}
    </>
  )
}
