import { useNavigate } from "react-router-dom";

export default function Page() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/dashboard")}>button</button>
    </div>
  );
}
