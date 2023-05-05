import { Wallet } from "ethers"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
    wallet: string
    password: string
    mnemonic?: string
}

const SignupInfo = ({wallet, password, mnemonic}: Props) => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    let address = '', privateKey = '';
    try {
        const _wallet = Wallet.fromEncryptedJsonSync(wallet, password);
        address = _wallet.address;
        privateKey = _wallet.privateKey;
    } catch (error) {
        setError(true);
    }

    return (
        error ?
        <p>The password is incorrect. Please try again</p>
        :
        <div className="account-details">
            <h2>Please store the following info offline/locally safe. This info will only be shown only once</h2>
            <p><label>WalletAddress :</label> {address}</p>
            <p><label>Privatekey : </label> {privateKey}</p>
            <p><label>Mnemonic : </label> {mnemonic}</p>
            <button onClick={() => {
                localStorage.setItem("address", address)
                navigate("/")

            }}>I have saved the info.</button>
        </div>
    )
}

export default SignupInfo