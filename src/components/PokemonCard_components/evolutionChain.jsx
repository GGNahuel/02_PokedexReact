import { renameEvolutionProps } from '../../services/renameObjectProps'

export function EvolutionElements ({ obj }) {
  const { nameLink, evolutionDetails, evolvesTo, idLink, spriteSource } = renameEvolutionProps(obj)

  return (
    <>
      <p>{nameLink} {idLink}</p>
      <img src={spriteSource} alt='' loading='lazy' />
      {evolutionDetails.map(arrayCondition =>
        arrayCondition.condition === 'Trigger'
          ? <p key={arrayCondition.condition}>Se activa la evolución al {arrayCondition.value}</p>
          : <p key={arrayCondition.condition}>Condición: {arrayCondition.condition} = {arrayCondition.value}</p>
      )}
      {evolvesTo.length > 0 &&
        <div className='evolPath_main'>
          {evolvesTo.map(element => (
            <EvolutionElements key={renameEvolutionProps(element).nameLink} obj={element} />
          ))}
        </div>}
    </>
  )
}
