import { Wallet } from "ethers"
import { useState } from "react"
import { API_URL } from "../constants"
import UserExists from "../components/signUp/UserExists"


const SignUp = () => {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [mnemonic, setMnemonic] = useState("");

  const handleClick = async () => {
    const wallet = Wallet.createRandom();
    const encrypted = await wallet.encrypt(password);
    localStorage.setItem('user', encrypted);
    setUser(encrypted);
    setMnemonic(wallet.mnemonic?.phrase || '');

    // save user in backend and get user id
    const signup_url = API_URL + "/user";
    fetch(signup_url, {
      method: "POST",
      body: JSON.stringify({ address: wallet.address }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("user_id", data.id)
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        // TODO: complete this error handling
      });
  }

  return (
    <div className="signup">
      {user ?
        <UserExists
          wallet={user}
          password={password}
          mnemonic={mnemonic}
        />
        :
        <>
          <h2>Enter a password for your local wallet</h2>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick}>
            Create Account
          </button>
        </>
      }
    </div>
  )
}

export default SignUp
