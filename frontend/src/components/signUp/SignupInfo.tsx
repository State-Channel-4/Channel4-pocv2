import { Wallet } from "ethers"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
    wallet: string
    password: string
    mnemonic?: string
}

const SignupInfo = ({wallet, password, mnemonic}: Props) => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [address, setAddress] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    useEffect(() => {
        try {
            const _wallet = Wallet.fromEncryptedJsonSync(wallet, password);
            setAddress(_wallet.address);
            setPrivateKey(_wallet.privateKey);
        } catch (error) {
            setError(true);
        }
    }, [wallet, password])

    const onClickDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([wallet], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "wallet.json";
        document.body.appendChild(element);
        element.click();
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
            <button onClick={onClickDownload}>
                Download wallet in JSON
            </button>
        </div>
    )
}

export default SignupInfo