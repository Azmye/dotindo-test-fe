import { AiOutlineLoading } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

type Props = {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
};

export default function SearchInput({ value, onChange, isLoading }: Props) {
  return (
    <div className="border-b p-1 group hover:border-sky-500 focus-within:border-sky-500 mb-2 flex justify-between">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className="outline-none bg-transparent w-full"
      />
      {isLoading ? (
        <AiOutlineLoading className="animate-spin" />
      ) : (
        <FaSearch className="group-hover:text-sky-500 group-focus-within:text-sky-500" />
      )}
    </div>
  );
}
