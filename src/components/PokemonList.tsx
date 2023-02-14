import { useQuery } from 'react-query'
import { useAppSelector } from '../app/hooks'
import {Link} from 'react-router-dom'
import { useState, useMemo } from 'react'


const Pokemondata = () => {

  type Pokemons = {
    id: string,
    name: string,
  }
    
    const {pokemons} = useAppSelector((state) => state.pokemon)
    const [pokemonData, setPokemonData] = useState<Array<Pokemons>>([])

  
    function getPokemonId() {
        pokemons.map( pokemon =>    
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.json())
        .then(data => setPokemonData(prev=> { return [...prev,data]}))
      )
      
        
    }
    
    useQuery({
      queryKey: ['projects', pokemons],
      queryFn: getPokemonId,
      enabled: pokemons.length !== 0,
    })

    const pokemonList = useMemo(() => {
      if(pokemonData.length === pokemons.length) {
        return pokemonData.map(pokemon => (
          <div key = {pokemon.id}>
            <Link to = {`/${pokemon.id}`}>{pokemon.name}</Link>
          </div>
        ))
      } else {
        return (
          <></>
        )
      }
      
    },[pokemonData]) 
  
  return (
    <div className='grid max-[350px]:grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 p-2'>
      {pokemonList}
    </div>
  )
}

export default Pokemondata
