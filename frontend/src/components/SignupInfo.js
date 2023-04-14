import { useNavigate } from "react-router-dom";
const Signupinfo = ({response}) => {
    const navigate = useNavigate()
    return (
    <div className="signup-details">
        <h2>Please store the following info offline/locally safe. This info will only be shown only once</h2>
        <p><label>WalletAddress :</label> {response.user.walletAddress}</p>
        <p><label>Privatekey : </label> {response.PrivateKey}</p>
        <p><label>mnemonic: </label> {response.mnemonic}</p>
        <button onClick={() => {
            localStorage.setItem("address", response.user.walletAddress)
            navigate("/")

        }}>I have saved the info.</button>
    </div>
    );
}

export default Signupinfo;