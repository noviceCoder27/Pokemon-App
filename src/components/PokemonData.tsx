import React from 'react'
import { useQuery } from 'react-query'
import { useRef } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { data } from '../createSlice/pokemonSlice'

const Pokemondata = () => {
    const {pokemon} = useAppSelector((state) => state.pokemon)
    const ref = useRef<number>(1)

   type Pokemon = {
        name: string,
        url: string
   }

   type PokemonList = {
        results: Array<Pokemon>
   }

    async function getPokemonData() {
        try {
            const data: Pokemon[] = await (await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000')).json()
            return data
        } catch(error: any) {
            console.log("Error loading data", error.message)
        }
    }

    const { isLoading, error, data: pokemons } = useQuery('pokemonData', getPokemonData)

    
    const PokemonList = (pokemons as unknown as PokemonList)?.results.slice(0,100).map(pokemon => (
        <div key = {ref.current++} >
            <a href = '#'>{pokemon.name}</a>
        </div>
    ))

  return (
    <div className='grid max-[350px]:grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 p-2'>
      {isLoading && 
      <>
        <svg className="animate-spin h-5 w-5 mr-3 rounded-full " viewBox="0 0 24 24" />
        <span>Loading ...</span>
      </>
      }
      {error && (error as any).message}
      {pokemons && PokemonList}
    </div>
  )
}

export default Pokemondata
