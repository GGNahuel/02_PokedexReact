import { useEffect, useState } from 'react'

import { getLocationEncounterAreas } from '../services/getPokeApis'

export function useLocationEncounterAreasGenerator ({ locationsURL }) {
  const [locationAreas, setLocationAreas] = useState([])

  useEffect(() => {
    async function generateLocationAreas () {
      const locations = await getLocationEncounterAreas(locationsURL)
      setLocationAreas(locations)
    }
    generateLocationAreas()
  }, [locationsURL])

  return { locationAreas }
}
