import { renameLocationEncounterAreas } from '../../services/constantes'

export function LocationEncounterAreas ({ dataObjt }) {
  const { location, versionDetails, versionNames, maxChances, encounterDetails } = renameLocationEncounterAreas(dataObjt)
  return (
    <>
      <li>Lugar de encuentro: {location}</li>
      {versionDetails.map((_, indicePadre) => (
        <ul key={versionNames[indicePadre]}>
          <li>Juego: Pokemon {versionNames[indicePadre]}</li>
          <li>Chance de aparición: {maxChances[indicePadre]}%</li>
          {encounterDetails[indicePadre].map((element, index, array) => {
            if (index > 0 && element.method.name === array[index - 1].method.name) return ''

            return (
              <ul key={index}>Metodo/s de obtención:
                <li>
                  {element.method.name + ' '}
                  {element.condition_values.length > 0 &&
                                        'condición:' + element.condition_values.map(condition => condition.name)}
                </li>
                <li>Nivel de aparición: {element.min_level}
                  {element.max_level !== element.min_level && ' a ' + element.max_level}
                </li>
              </ul>
            )
          })}
          <br />
        </ul>
      ))}
      <br />
    </>
  )
}
