// store.js
import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    search: searchReducer,
  },
});
