import { Wallet } from "ethers"
import { useRef, useState } from "react"
import { API_URL } from "../constants"
import Notification from "../components/Notification"
import UserExists from "../components/signUp/UserExists"


const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [mnemonic, setMnemonic] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleClickCreate = async () => {
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

  const handleFileChange = async (e: any) => {
    if (!e.target.files[0]) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const encrypted = e.target?.result;
      if (typeof encrypted === "string") {
        localStorage.setItem('user', encrypted);
        setUser(encrypted);
      }
    }
    reader.readAsText(file);
    // reset input element
    e.target.value = "";
  }

  const handleClickImport = async () => {
    // import json file from computer
    if (!fileRef.current) return;
    fileRef.current.click();
  }

  return (
    <div className="signup text-white">
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
          <button onClick={handleClickCreate}>
            Create Account
          </button>
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept="application/json"
            onChange={handleFileChange}
          />
          <button onClick={handleClickImport}>
            Import Account
          </button>
        </>
      }
      {error ? <Notification color="red">{error}</Notification> : null}
    </div>
  )
}

export default SignUp
