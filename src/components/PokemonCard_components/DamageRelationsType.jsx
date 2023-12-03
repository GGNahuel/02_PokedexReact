import { renameTypeProps } from '../../services/constantes'
import { TypeTag } from './TypeTag'

export function DamageRelationsType ({ dataObj }) {
  const { baseElement, x2DmgFrom, x2DmgTo, halfDmgFrom, halfDmgTo, noDmgFrom, noDmgTo } = renameTypeProps(dataObj)
  return (
    <>
      <h3>{baseElement}</h3>
      <p><strong>Recibe doble daño de:</strong></p>
      {x2DmgFrom.map(element => (
        <TypeTag key={element.name} type={element.name} />
      ))}
      <p><strong>Super eficaz contra:</strong></p>
      {x2DmgTo.map(element => (
        <TypeTag key={element.name} type={element.name} />
      ))}
      <p><strong>Recibe Menos daño de:</strong></p>
      {halfDmgFrom.map(element => (
        <TypeTag key={element.name} type={element.name} />
      ))}
      <p><strong>No es muy eficaz contra:</strong></p>
      {halfDmgTo.map(element => (
        <TypeTag key={element.name} type={element.name} />
      ))}
      <p><strong>Daño nulo de:</strong></p>
      {noDmgFrom.map(element => (
        <TypeTag key={element.name} type={element.name} />
      ))}
      <p><strong>Daño nulo hacia:</strong></p>
      {noDmgTo.map(element => (
        <TypeTag key={element.name} type={element.name} />
      ))}
      <br />
    </>
  )
}
