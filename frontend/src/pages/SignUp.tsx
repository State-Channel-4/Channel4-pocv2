import { Wallet } from "ethers"
import { useState } from "react"
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

    // TODO: save user in backend and get user id
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
