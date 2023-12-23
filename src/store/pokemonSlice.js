// pokemonSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemonList: [],
    selectedPokemon: null,
    isLoading: false,
    offset: 0,
  },
  reducers: {
    setPokemonList: (state, action) => {
      state.pokemonList = action.payload;
    },
    addPokemonToList: (state, action) => {
      state.pokemonList = [...state.pokemonList, ...action.payload];
    },
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
});

export const {
  setPokemonList,
  addPokemonToList,
  setSelectedPokemon,
  setLoading,
  setOffset,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
