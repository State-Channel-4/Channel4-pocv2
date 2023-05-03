import { Wallet } from "ethers"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../constants";
import Notification from "../components/Notification"

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = localStorage.getItem("user");
    if (!user) {
      setError('There is no account in local');
      return;
    }

    try {
      const wallet = await Wallet.fromEncryptedJson(user, password);
      const signedMessage = await wallet.signMessage("login to backend");

      const result = await fetch(API_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signedMessage }),
      }).then((response) => response.json());

      console.log(result);
      console.log("login success");
      navigate("/");

    } catch (e) {
      // TODO: handle error when incorrect password and when backend is down
      console.log(e)
      setError('The password is incorrect. Please try again');
    }
  }

  return (
    <div className="create">
      <h2>Enter your local wallet password</h2>
      <form onSubmit={handleSubmit}>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      {error ? <Notification color="red">{error}</Notification> : null}
      <button
        onClick={() => {
          navigate("/recover-account")
        }}
      >
        Recover Account
      </button>
    </div>
  )
}

export default Login
