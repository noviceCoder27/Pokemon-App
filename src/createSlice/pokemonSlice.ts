import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface PokemonSlice {
    search: string,
    pokemons: Array<string>
}

const initialState: PokemonSlice = {
    search: '',
    pokemons: [],
}

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        input: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        data: (state,action: PayloadAction<string>) => {
            state.pokemons.push(action.payload)
        }
    }
})

export const {input, data} = pokemonSlice.actions
export default pokemonSlice.reducer