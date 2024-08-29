import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Navbar() {
  const { state, logout } = useContext(AuthContext);
  return (
    <div className="py-4 px-72 bg-sky-500 shadow-md flex justify-between">
      <h1 className="text-white text-xl font-semibold">
        Poke<span className="text-yellow-300">Find</span>
      </h1>
      <div className="flex items-center">
        <h5 className="text-white">{state.user?.email}</h5>
        <span>/</span>
        <button onClick={logout} className="hover:text-slate-300">
          Logout
        </button>
      </div>
    </div>
  );
}
