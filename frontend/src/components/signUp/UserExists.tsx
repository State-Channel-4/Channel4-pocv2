import { useState } from "react"
import { useNavigate } from "react-router-dom"

import SignupInfo from "./SignupInfo"

type Props = {
  wallet: string
  password: string
  mnemonic: string
}

const UserExists = ({ wallet, password, mnemonic }: Props) => {
  const navigate = useNavigate()
  const [_password, _setPassword] = useState(password)
  const [typedPassword, setTypedPassword] = useState("")

  const handleClick = async () => {
    _setPassword(typedPassword)
  }

  return (
    <>
      <h2>There is an account saved in this device</h2>
      {_password === "" ? (
        <>
          <h2>Enter a password for your local wallet</h2>
          <label>Password</label>
          <input
            type="password"
            value={typedPassword}
            onChange={(e) => setTypedPassword(e.target.value)}
          />
          <button onClick={handleClick}>Recover Account</button>
        </>
      ) : (
        <SignupInfo wallet={wallet} password={_password} mnemonic={mnemonic} />
      )}
      <button
        onClick={() => {
          navigate("/")
        }}
      >
        Return home
      </button>
    </>
  )
}

export default UserExists
