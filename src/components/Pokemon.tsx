import SearchBox from './SearchBox'
import PokemonList from './PokemonList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PokemonData from './PokemonData';


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
]);

const Pokemon = () => {
  return (
      <RouterProvider router = {router}/>
  )
}

export default Pokemon
