import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

interface PokemonSlice {
    search: string,
    pokemon: string
}

const initialState: PokemonSlice = {
    search: '',
    pokemon: ''
}

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        input: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        data: (state,action: PayloadAction<string>) => {
            state.pokemon = action.payload
        }
    }
})

export const {input, data} = pokemonSlice.actions
export const selectCount = (state: RootState) => state.pokemon
export default pokemonSlice.reducer