import React from 'react'
import PokeDex from '../assets/Pokedex.png'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { input } from '../createSlice/pokemonSlice'

const SearchBox = () => {
    const {search} = useAppSelector((state) => state.pokemon)
    const dispatch = useAppDispatch()

    return (
        <div className='bg-red-500 p-2 flex flex-col max-sm:items-center'>
            <img src = {PokeDex} alt = 'Pokedex Logo'className='w-1/2 mb-4 sm:max-w-[250px] sm:w-1/4'/>
            <label htmlFor='searchBox'></label>
            <input type="text" id="searchbox" className='w-full p-2 px-8 bg-gray-100 outline-slate-500 border-[1px] border-slate-300 rounded-md' onChange={(e) => dispatch(input(e.target.value))}/>
            <span className="fa-solid fa-magnifying-glass self-start ml-2 relative bottom-[28px] text-slate-800"></span>
        </div>
    )
}

export default SearchBox
