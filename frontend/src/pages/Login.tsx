import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../constants"

const Login = () => {
  const [walletAddress, setwalletAddress] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const address = { walletAddress }
    const login_url = API_URL + "login"

    fetch(login_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("user:", data)
        localStorage.setItem("user", JSON.stringify(data))
        console.log("login success")
        navigate("/")
      })
  }

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
          navigate("/recover-account")
        }}
      >
        Recover Account
      </button>
    </div>
  )
}

export default Login
