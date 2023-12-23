import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ selectedPokemon, closeModal }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const id =
    selectedPokemon.url.split("/")[selectedPokemon.url.split("/").length - 2];

  const fetchPokemonDetails = async () => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${selectedPokemon.name}`
      );
      const data = await res.json();
      console.log("Pokemon details:", data);
      setPokemonDetails(data);
    } catch (error) {
      console.error("Error fetching Pokemon type:", error);
    }
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, [selectedPokemon]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const ProgressBar = ({ stat, value, color }) => (
    <div className="mb-2">
      <div className="flex justify-between mb-2">
        <span>{stat}</span>
        <span>{value}</span>
      </div>
      <div className={`h-2 bg-gray-300 rounded overflow-hidden w-60`}>
        <div
          className={`h-full ${color} transition-width duration-500 ease-in-out`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="w-full h-full md:w-4/5 md:h-2/5 bg-white p-4 rounded-lg relative">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">Pokemon Details</div>
          <IoMdClose
            size={24}
            onClick={closeModal}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col items-center md:items-start md:flex-row gap-20 mt-20 md:mt-5">
          <div className="flex items-center justify-center">
            <img
              className="w-60 h-60 border border-gray-300 rounded-md p-2"
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
              alt={selectedPokemon}
            />
          </div>
          <div className="">
            <h1 className="text-2xl font-bold">
              {" "}
              {selectedPokemon.name.charAt(0).toUpperCase() +
                selectedPokemon.name.slice(1)}{" "}
            </h1>
            <div className="flex items-center gap-4 mt-3">
              Types:
              {pokemonDetails?.types?.map((type, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-md p-1"
                >
                  {type.type.name.charAt(0).toUpperCase() +
                    type.type.name.slice(1)}
                </div>
              ))}
            </div>
            <div>
              <div className="mt-3">
                {pokemonDetails?.stats?.map(
                  (stat, index) =>
                    index < 3 && (
                      <ProgressBar
                        key={index}
                        stat={stat.stat.name}
                        value={stat.base_stat}
                        color={
                          stat.base_stat > 50
                            ? "bg-green-500"
                            : stat.base_stat > 30
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }
                      />
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
