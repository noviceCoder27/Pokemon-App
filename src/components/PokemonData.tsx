import {useParams} from 'react-router-dom'
import { useQuery } from 'react-query'

function PokemonData() {

  type stats = {
    name: string,
  }

  type statistics = {
    stat: stats
    base_stat: number,
  }

  type imageTypes = {
    front_default: string,
    back_deafult: string
  }

  type Pokemon = {
    sprites: imageTypes,
    name: string,
    stats: Array<statistics>
  }

    let {id} = useParams()
    async function getPokemonData() {
      const data: Pokemon = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)).json()
      return data
    }

    const {isLoading,data} = useQuery('pokemonData', getPokemonData)
  return (
   <div className='flex flex-col justify-center items-center h-screen '>
    {isLoading && <>Loading ...</>}
    <h1 className='text-3xl font-mono'>Pokemon Stats</h1>
    <img src = {data?.sprites.front_default} className = 'w-40'/>
    <div className='font-bold'>
      <span>Name: </span>
      <span>{data?.name}</span>
    </div>
    <div className='flex flex-col mt-2 w-40'>
      {data?.stats.map((statistics,index) => (
        <div key = {index} className = 'flex justify-between'>
          <p>{`${statistics.stat.name}: `}</p>
          <p>{statistics.base_stat}</p>
        </div>
      ))}
    </div>
   
   </div>
  )
}

export default PokemonData
