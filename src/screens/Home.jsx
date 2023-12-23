import PokemonCard from "../components/PokemonCard";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchPokemonList = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
      );

      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (offset === 0) {
        setPokemonList(data.results);
      } else {
        setPokemonList((prevList) => [...prevList, ...data.results]);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, [offset]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = window.innerHeight;

    if (clientHeight + scrollTop + 1 >= scrollHeight) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  };

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setShowModal(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10">
      {pokemonList.map((pokemon, index) => (
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
        <Modal selectedPokemon={selectedPokemon} closeModal={closeModal} />
      )}
    </div>
  );
}
