import React from "react";

const PokemonCard = ({ id, name, types }) => {
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
