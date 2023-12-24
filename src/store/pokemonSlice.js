import { createSlice, createAction } from "@reduxjs/toolkit";

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    fullPokemonList: [], // New state to store the full list of pokemons
    pokemonList: [],
    selectedPokemon: null,
    isLoading: false,
    offset: 0,
  },
  reducers: {
    setFullPokemonList: (state, action) => {
      state.fullPokemonList = action.payload;
    },
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
  setFullPokemonList,
  setPokemonList,
  addPokemonToList,
  setSelectedPokemon,
  setLoading,
  setOffset,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
