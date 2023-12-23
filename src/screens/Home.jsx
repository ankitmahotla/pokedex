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
import PokemonCard from "../components/PokemonCard";
import Modal from "../components/Modal";
import MoonLoader from "react-spinners/MoonLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { pokemonList, selectedPokemon, isLoading, offset } = useSelector(
    (state) => state.pokemon
  );
  const searchInput = useSelector((state) => state.search.searchInput);

  const [showModal, setShowModal] = useState(false);

  const fetchPokemonList = async () => {
    try {
      dispatch(setLoading(true));

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
      );

      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (offset === 0) {
        dispatch(setPokemonList(data.results));
      } else {
        dispatch(addPokemonToList(data.results));
      }

      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  const filteredPokemonList = pokemonList.filter((pokemon) => {
    const searchTerm = searchInput.toLowerCase();
    return (
      pokemon.name.toLowerCase().includes(searchTerm) ||
      pokemon.url.includes(`/pokemon/${searchTerm}`)
    );
  });

  useEffect(() => {
    fetchPokemonList();
  }, [offset]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = window.innerHeight;

    if (clientHeight + scrollTop + 1 >= scrollHeight) {
      dispatch(setOffset(offset + 20));
    }
  };

  const handleCardClick = (pokemon) => {
    dispatch(setSelectedPokemon(pokemon));
    setShowModal(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10">
      {filteredPokemonList.map((pokemon, index) => (
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
