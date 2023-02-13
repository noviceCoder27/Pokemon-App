import { useQuery } from 'react-query'
import { useAppSelector } from '../app/hooks'
import {Link} from 'react-router-dom'
import {useEffect} from 'react'


const Pokemondata = () => {

   type Error = {
    message: string
   }
    const {pokemon} = useAppSelector((state) => state.pokemon)

    // useEffect(() => {
    //   console.log(pokemon)
    // },[pokemon])

    async function getPokemonId() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon[0]}`)     
      } catch(err: unknown) {
          console.log('Error fetching data')
      }
    }
    
    const {
      status,
      data: pokemonID,
    } = useQuery({
      queryKey: ['projects', pokemon],
      queryFn: getPokemonId,
      enabled: pokemon.length !== 0,
    })
    
    
    // async function getId(pokemon: Pokemons) {
    //   try {
    //     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    //     const data = await response.json()
    //     const id = data.id
         
    //   }catch(err) {
    //     console.log(err)
    //   }
    // }

    
    
    // const pokemonList = searchPokemons?.map(pokemon => {
    //   getId(pokemon)
    // })

  return (
    <div className='grid max-[350px]:grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 p-2'>
      {/* {isLoading && 
      <>
        <svg className="animate-spin h-5 w-5 mr-3 rounded-full " viewBox="0 0 24 24" />
        <span>Loading ...</span>
      </>
      }
      {error && (error as any).message} */}
      
    </div>
  )
}

export default Pokemondata
