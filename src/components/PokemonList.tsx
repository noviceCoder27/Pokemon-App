import { useQuery } from 'react-query'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {Link} from 'react-router-dom'
import {useState,useMemo} from 'react'

const Pokemondata = () => {
    const {search} = useAppSelector((state) => state.pokemon)
    const [pokemonId, setPokemonId] = useState()

   type Pokemons = {
        name: string,
        url: string
   }

   type PokemonList = {
        results: Array<Pokemons>
   }

    async function getPokemonList() {
        try {
            const data: Pokemons[] = await (await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000')).json()
            return data
        } catch(error: any) {
            console.log("Error loading data", error.message)
        }
    }


    const { isLoading, error, data: pokemons } = useQuery('pokemonList', getPokemonList)

    const searchPokemons = (pokemons as unknown as PokemonList)?.results.slice(0,100).filter(pokemonFilter => pokemonFilter.name.toLowerCase().includes(search.toLowerCase()))

    async function getId(pokemon: Pokemons) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await response.json()
        const id = data.id
        setPokemonId(id)
      }catch(err) {
        console.log(err)
      }
    }
    
    const pokemonList = useMemo(() => searchPokemons?.map(pokemon => {
      getId(pokemon).then(() => console.log(pokemonId))
     
    }), [pokemons,search])

  return (
    <div className='grid max-[350px]:grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 p-2'>
      {isLoading && 
      <>
        <svg className="animate-spin h-5 w-5 mr-3 rounded-full " viewBox="0 0 24 24" />
        <span>Loading ...</span>
      </>
      }
      {error && (error as any).message}
      {pokemons && pokemonList}
    </div>
  )
}

export default Pokemondata
