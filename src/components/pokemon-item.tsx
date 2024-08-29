import { PokemonEssentialDetails } from "../types/pokemon";
import { useFetch } from "../hooks/useFetch";

interface Props {
  name: string;
  url: string;
}

export default function PokemonItem({ name, url }: Props) {
  const { data } = useFetch<PokemonEssentialDetails>(
    `${url || `https://pokeapi.co/api/v2/pokemon/${name}`}`
  );

  return (
    <div className="shadow-md rounded-md p-2 bg-white">
      <h5 className="text-center font-semibold">{data?.name}</h5>
      <div className="flex  items-center">
        <img
          className="w-1/2 object-contain"
          src={data?.sprites?.front_default}
          alt={data?.name}
        />
        <div className="w-1/2">
          <p>Height: {data?.height}</p>
          <p>Weight: {data?.weight}</p>
          <p>
            Types :{" "}
            {data?.types.map((item, index) => (
              <span key={index}>{item.type.name}</span>
            ))}
          </p>
          <p>
            Abilities :
            {data?.abilities.map((item, index) => (
              <span key={index}>{item.ability.name}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
