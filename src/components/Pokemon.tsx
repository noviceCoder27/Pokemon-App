import SearchBox from './SearchBox'
import PokemonList from './PokemonList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PokemonData from './PokemonData'
import {useEffect} from 'react'
import { useAppDispatch } from '../app/hooks'
import { useQuery } from 'react-query'
import { data } from '../createSlice/pokemonSlice'

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
      <SearchBox />
      <PokemonList />
    </>,
    children: [
      {
        path: 'pokemons/:id',
        element: <PokemonData />
      }
    ]
  },
  {
    path: "/:id",
    element: <PokemonData />
  }
])

const Pokemon = () => {

  const dispatch = useAppDispatch()
    
  interface Pokemon {
    name: string
  }

  interface Pokemons extends Object {
    results: Array<Pokemon>
  }

  async function getPokemonList() {
      try {
          const data: Pokemons = await (await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000')).json()
          return data
      } catch(error: any) {
          console.log("Error loading data", error.message)
      }
  }


  const { isLoading, error, data: pokemons } = useQuery('pokemonList', getPokemonList)
  
  
  useEffect(() => {
    pokemons?.results.slice(0,100).map(pokemon => dispatch(data(pokemon.name)))
  },[pokemons])

  return (
      <RouterProvider router = {router}/>
  )
}

export default Pokemon
