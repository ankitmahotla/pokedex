// store.js
import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import searchReducer from "./searchSlice";
import typeReducer from "./typeSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    search: searchReducer,
    type: typeReducer,
  },
});
