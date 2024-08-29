import { useState } from "react";
import SearchInput from "../components/search-input";
import useDebounce from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { VscLoading } from "react-icons/vsc";
import { PokemonEssentialDetails, pokemonList } from "../types/pokemon";
import PokemonItem from "../components/pokemon-item";

interface Response extends PokemonEssentialDetails {
  results: pokemonList[];
}

export default function Page() {
  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedValue = useDebounce({ value: searchValue, delay: 500 });

  const { data, isLoading, error } = useFetch<Response>(
    `https://pokeapi.co/api/v2/pokemon/${debouncedValue}`
  );

  return (
    <div className="py-5">
      <SearchInput
        value={searchValue}
        onChange={setSearchValue}
        isLoading={isLoading}
      />

      {/* Showing List of pokemon */}
      {data?.results?.length && (
        <div className="grid grid-cols-2 gap-5">
          {data.results.map((pokemon, index) => (
            <div key={index} className="grid">
              <PokemonItem name={pokemon.name} url={pokemon.url} />
            </div>
          ))}
        </div>
      )}

      {/* Showing Detail of pokemon */}
      {data?.name && <PokemonItem name={data?.name} url="" />}

      {isLoading && (
        <div className="flex gap-1 items-center justify-center">
          <VscLoading className="animate-spin" />
          <p>Wait a moment...</p>
        </div>
      )}

      {error && (
        <div className="w-full text-center mt-10">
          <p>Error: {error.message}</p>
          {error.message.toLowerCase().includes("not found") && (
            <p>Sorry seems can't to find your pokemon, please try again</p>
          )}
        </div>
      )}
    </div>
  );
}
