import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { MockUser } from "../../_mock/user";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = React.useState<string>(MockUser.email);
  const [password, setPassword] = React.useState<string>(MockUser.password);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === MockUser.email && password === MockUser.password) {
      await login(email, password);
      navigate("/");
      return;
    }

    alert("Invalid credentials");
  };

  return (
    <div className="h-dvh flex">
      <div className="w-96 m-auto shadow-md p-2 rounded-md bg-white">
        <h1 className="text-center text-2xl font-semibold">Login</h1>
        <form onSubmit={onSubmit}>
          <div className="border-b p-1 group hover:border-sky-500 focus-within:border-sky-500 mb-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="w-full outline-none bg-transparent"
              placeholder="Email"
            />
          </div>

          <div className="border-b p-1 group hover:border-sky-500 focus-within:border-sky-500 mb-2">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              className="w-full outline-none bg-transparent"
              placeholder="Email"
            />
          </div>

          <div className="flex items-center justify-end gap-1 mb-5">
            <input
              id="showPassword"
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
              checked={showPassword}
            />
            <label htmlFor="showPassword">show password</label>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 rounded-md text-white py-2 hover:bg-sky-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
