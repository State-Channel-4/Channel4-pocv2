import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Recovered = ({recovered_account_json}) => {
    const navigate = useNavigate();

  return (
    <div className="account-details">
      <h2>Recovered account</h2>
      <p><label>WalletAddress :</label>{recovered_account_json.address}</p>
      <p><label>PublicKey : </label> {recovered_account_json.public_key}</p>
      <p><label>Privatekey : </label> {recovered_account_json.private_key}</p>
      <button onClick={() => navigate("/")}>Back to login</button>
    </div>
  );

}

const Recoveryform = ({mnemonics, setMnemonic, handleSubmit}) => {
    return (
        <div className="create">
        <h2>Enter mnemonics</h2>
        <form onSubmit={handleSubmit}>
          <label>Mnemonics</label>
          <input
            type="text"
            required
            value={mnemonics}
            onChange={(e) => {
                console.log("mnemonicsss : ", e.target.value)
                setMnemonic(e.target.value)
            }}
          />
          <button>Recover</button>
        </form>
      </div>
    )
}

const RecoverAccount = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [recovered_account_json, setRecovered_account_json] = useState("");
  const [recovered, setRecovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mnemonic_phrase = { mnemonic };
    console.log("mnemonic phrase : ", mnemonic_phrase);
    console.log("json : ", JSON.stringify(mnemonic_phrase));
    const recover_url = process.env.REACT_APP_API_URL + "recover_account"
    fetch(recover_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mnemonic_phrase),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setRecovered_account_json(data);
        setRecovered(true);
      });
  };

  return (
    <div>
    {recovered &&  <Recovered recovered_account_json={recovered_account_json}/>}
    { !recovered && <Recoveryform mnemonic={mnemonic} setMnemonic={setMnemonic} handleSubmit={handleSubmit}/>}
    </div>
  );
};

export default RecoverAccount;
