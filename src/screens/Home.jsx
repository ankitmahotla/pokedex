// Home.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPokemonList,
  addPokemonToList,
  setSelectedPokemon,
  setLoading,
  setOffset,
} from "../store/pokemonSlice";
import { setFullPokemonList } from "../store/pokemonSlice";
import { setSelectedType } from "../store/typeSlice";
import PokemonCard from "../components/PokemonCard";
import Modal from "../components/Modal";
import MoonLoader from "react-spinners/MoonLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { fullPokemonList, selectedPokemon, isLoading, offset } = useSelector(
    (state) => state.pokemon
  );
  const searchInput = useSelector((state) => state.search.searchInput);
  const selectedType = useSelector((state) => state.type.selectedType); // New state for selected type

  const [showModal, setShowModal] = useState(false);

  const fetchPokemonList = async () => {
    try {
      dispatch(setLoading(true));

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=1000`
      );
      const data = await response.json();

      // Ensure each Pokemon object has a 'types' property
      const pokemonListWithTypes = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonData = await fetch(pokemon.url).then((res) =>
            res.json()
          );
          return {
            ...pokemon,
            types: pokemonData.types,
          };
        })
      );

      dispatch(setFullPokemonList(pokemonListWithTypes));
      dispatch(setPokemonList(pokemonListWithTypes.slice(0, 20)));
      dispatch(setOffset(20));

      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, offset]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = window.innerHeight;

    if (clientHeight + scrollTop + 1 >= scrollHeight) {
      dispatch(setLoading(true)); // Show the loader

      setTimeout(() => {
        dispatch(addPokemonToList(fullPokemonList.slice(offset, offset + 20)));
        dispatch(setOffset(offset + 20));
        dispatch(setLoading(false)); // Hide the loader after the delay
      }, 1000);
    }
  };

  const handleCardClick = (pokemon) => {
    dispatch(setSelectedPokemon(pokemon));
    setShowModal(true);
  };

  const filteredPokemonList = fullPokemonList.filter((pokemon) => {
    const searchTerm = searchInput.toLowerCase();
    const pokemonType = selectedType.toLowerCase();

    return (
      (pokemon.name.toLowerCase().includes(searchTerm) ||
        pokemon.url.includes(`/pokemon/${searchTerm}`)) &&
      (selectedType === "Type" || // Show all types if "Type" is selected
        pokemon.types?.some((type) => type.type.name === pokemonType))
    );
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10">
      {filteredPokemonList.slice(0, offset).map((pokemon, index) => (
        <div
          key={pokemon.name}
          id={`pokemon-${index}`}
          className="col-span-1 cursor-pointer transition-transform transform hover:scale-105"
          onClick={() => handleCardClick(pokemon)}
        >
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
      {isLoading && (
        <div className="col-span-full flex justify-center my-4">
          <MoonLoader size={30} color={"#36D7B7"} loading={isLoading} />
        </div>
      )}
      {showModal && (
        <Modal
          selectedPokemon={selectedPokemon}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
