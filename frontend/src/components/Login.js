import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [walletAddress, setwalletAddress] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const address = { walletAddress };

    fetch("https://grove-instinctive-responsibility.glitch.me/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("user:", data);
        localStorage.setItem("user", JSON.stringify(data));
        console.log("login success");
        navigate("/");
      });
  };

  return (
    <div className="create">
      <h2>Enter wallet address</h2>
      <form onSubmit={handleSubmit}>
        <label>Wallet address</label>
        <input
          type="text"
          required
          value={walletAddress}
          onChange={(e) => setwalletAddress(e.target.value)}
        />
        <button>Login</button>
      </form>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Recover Account
      </button>
    </div>
  );
};

export default Login;
