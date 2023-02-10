import {useParams} from 'react-router-dom'
import { useQuery } from 'react-query'

function PokemonData() {
    let {id} = useParams()
    async function getPokemonData() {
      const data = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)).json()
      return data
    }

    const {isLoading,data} = useQuery('pokemonData', getPokemonData)
  return (
   <>
    {isLoading && <>Loading ...</>}
    {JSON.stringify(data)}
   </>
  )
}

export default PokemonData
