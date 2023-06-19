import React, { useState } from "react"
import { Wallet } from "ethers"
import { useNavigate } from "react-router-dom"

import Notification from "../components/Notification"
import { API_URL } from "../constants"

const Login = () => {
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    setError(null)

    e.preventDefault()

    const user = localStorage.getItem("user")
    if (!user) {
      setError("There is no account in local")
      return
    }

    try {
      const wallet = await Wallet.fromEncryptedJson(user, password)
      const signedMessage = await wallet.signMessage("login to backend")

      const result = await fetch(API_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signedMessage }),
      }).then((response) => response.json())

      console.log(result)
      console.log("login success")
      navigate("/")
    } catch (e: any) {
      // handle error when incorrect password and when backend is down
      if (e.message.includes("invalid password")) {
        setError("The password is incorrect. Please try again")
        return
      }
      // TODO: handle error when user does not exist in backend
      setError(
        "There has been an error. Please try again later. Error: " +
          JSON.stringify(e)
      )
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
      <button
        onClick={() => {
          navigate("/recover-account")
        }}
      >
        Recover Account
      </button>
      {error ? <Notification color="red">{error}</Notification> : null}
    </div>
  )
}

export default Login
