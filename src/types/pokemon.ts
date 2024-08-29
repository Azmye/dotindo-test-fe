export type pokemonList = {
  name: string;
  url: string;
};

// Define a type for Pokémon types
type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

// Define a type for Pokémon sprites
type PokemonSprites = {
  front_default: string;
  front_shiny: string;
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};

// Extend the type for Pokémon essential details with additional fields
export type PokemonEssentialDetails = {
  id: number; // Pokémon ID
  name: string; // Pokémon name
  height: number; // Pokémon height
  weight: number; // Pokémon weight
  types: PokemonType[]; // Pokémon types
  sprites: PokemonSprites; // Pokémon sprites
  abilities: PokemonAbility[]; // Pokémon abilities
  base_experience: number; // Pokémon base experience
  stats: PokemonStat[]; // Pokémon stats
  moves: PokemonMove[]; // Pokémon moves
};

// Define a type for Pokémon abilities
type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

// Define a type for Pokémon stats
type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

// Define a type for Pokémon moves
type PokemonMove = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
};
