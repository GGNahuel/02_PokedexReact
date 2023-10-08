import { useState, useEffect } from "react"

import { getLocationEncounterAreas } from "../services/getPokeApis"
import { renameLocationEncounterAreas } from "../services/constantes"
import { LocationEncounterAreas } from "../components/PokemonCard_components/LocationEncounterAreas"

export function useLocationEncounterAreasGenerator({ locationsURL }){
    const [locationAreas, setLocationAreas] = useState([])

    useEffect(() => {
        async function generateLocationAreas() {
            const locations = await getLocationEncounterAreas(locationsURL)

            const locationElements = locations.map(element => {
                const { location } = renameLocationEncounterAreas(element)
                return (
                    <LocationEncounterAreas key={location} dataObjt={element} />
                )
            })
            setLocationAreas(locationElements)
        }
        generateLocationAreas()
    }, [])

    return locationAreas
}
