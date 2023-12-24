import { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPokemonList,
  addPokemonToList,
  setSelectedPokemon,
  setLoading,
  setOffset,
} from "../store/pokemonSlice";
import { setFullPokemonList } from "../store/pokemonSlice";
import Modal from "../components/Modal";
import MoonLoader from "react-spinners/MoonLoader";

const PokemonCard = lazy(() => import("../components/PokemonCard"));

const Home = () => {
  const dispatch = useDispatch();
  const { fullPokemonList, selectedPokemon, isLoading, offset } = useSelector(
    (state) => state.pokemon
  );
  const searchInput = useSelector((state) => state.search.searchInput);
  const selectedType = useSelector((state) => state.type.selectedType);

  const [showModal, setShowModal] = useState(false);

  const fetchPokemonList = async () => {
    try {
      dispatch(setLoading(true));

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=500`
      );
      const data = await response.json();

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
  }, [isLoading, offset, selectedType]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = window.innerHeight;

    if (clientHeight + scrollTop + 1 >= scrollHeight) {
      if (offset >= fullPokemonList.length) return;
      if (selectedType !== "Type") {
        const filteredList = fullPokemonList.filter((pokemon) =>
          pokemon.types?.some((type) => type.type.name === selectedType)
        );
        if (offset >= filteredList.length) return;
      }

      dispatch(setLoading(true));
      setTimeout(() => {
        dispatch(addPokemonToList(fullPokemonList.slice(offset, offset + 20)));
        dispatch(setOffset(offset + 20));
        dispatch(setLoading(false));
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
      (selectedType === "Type" ||
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
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-32 bg-gray-200 rounded-md">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-opacity-50"></div>
                <span className="ml-2 text-gray-700">Loading...</span>
              </div>
            }
          >
            <PokemonCard
              id={pokemon.url.split("/")[pokemon.url.split("/").length - 2]}
              name={
                pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
              }
              types={pokemon.types.map((type) => type.type.name)}
            />
          </Suspense>
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
