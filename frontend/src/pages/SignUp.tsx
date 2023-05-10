import { Wallet } from "ethers"
import { useState } from "react"
import { API_URL } from "../constants"
import Notification from "../components/Notification"
import UserExists from "../components/signUp/UserExists"


const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [mnemonic, setMnemonic] = useState("");

  const handleClick = async () => {
    setError(null);

    if (password === "") {
      setError("Password cannot be empty");
      return;
    }
    const wallet = Wallet.createRandom();
    const encrypted = await wallet.encrypt(password);
    localStorage.setItem('user', encrypted);
    setUser(encrypted);
    setMnemonic(wallet.mnemonic?.phrase || '');

    try {
      const result = await fetch(API_URL + "/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: wallet.address }),
      }).then((response) => response.json());

      const { user } = result;
      localStorage.setItem("user_id", user._id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.error && error.error.includes('E11000 duplicate key error collection: test.users')) {
        setError('User already exists');
      } else {
        setError(JSON.stringify(error));
      }
    }
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
      {error ? <Notification color="red">{error}</Notification> : null}
    </div>
  )
}

export default SignUp
