import { useEffect, useState } from "react";

const PokemonCard = ({ pokemon }) => {
  if (!pokemon)
    return (
      <div className="flex justify-center">
        <div>Loading...</div>
      </div>
    );

  const id = pokemon.url.split("/")[pokemon.url.split("/").length - 2];
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const [types, setTypes] = useState([]);

  const fetchPokemonType = async (pokemonId) => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const data = await res.json();
      const typeNames = data.types.map((type) => type.type.name);

      setTypes(typeNames);
    } catch (error) {
      console.error("Error fetching Pokemon type:", error);
    }
  };

  useEffect(() => {
    fetchPokemonType(id);
  }, [id]);

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="bg-gray-200 flex items-center justify-center p-2 rounded-md">
        <img
          src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
          className="w-32 h-32"
          alt={name}
          loading="lazy"
        />
      </div>
      <h2>
        #{id} {name}
      </h2>
      <div className="flex items-center gap-2">
        {types.map((type, index) => (
          <span key={index} className="border border-gray-300 rounded-md p-1">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
