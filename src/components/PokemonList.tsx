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
    const {search} = useAppSelector(state => state.pokemon)
  
    function getPokemonId() {
        pokemons.map( pokemon =>    
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.json())
        .then(data => setPokemonData(prev=> {
          if(pokemonData.length < 100) {
            return [...prev,data]
          } else {
            return [...prev]
          }
          
        }))
      )
    }
    
    useQuery({
      queryKey: ['projects', pokemons],
      queryFn: getPokemonId,
      enabled: pokemons.length !== 0,
    })

    const pokemonList = useMemo(() => {
      if(pokemonData.length === pokemons.length) {
        return pokemonData.map(pokemon => {
          if(pokemon.name.includes(search)) {
            return ( 
              <div key = {pokemon.id}>
                <Link to = {`/${pokemon.id}`}>{pokemon.name}</Link>
              </div>
            )}
          })
      } else {
        return (
          <></>
        )
      }
      
    },[pokemonData,search]) 
  
  return (
    <div className='grid max-[350px]:grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 p-2 bg-slate-200'>
      {pokemonList}
    </div>
  )
}

export default Pokemondata
