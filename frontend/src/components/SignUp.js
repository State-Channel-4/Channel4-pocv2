import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Signupinfo from "./SignupInfo";


const IsLoggedin = () => {
    const navigate = useNavigate()
    return (
        <div className= "signup">
            <h2>You are already logged in!!</h2>
            <button onClick={() => {
                navigate("/")
            }}>Return home</button>
        </div>
    )
}

const SignUp = () => {
    const address = localStorage.getItem("address");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, SetisPending] = useState(true);
    const navigate = useNavigate()
    const create_user = () => {
        fetch('https://grove-instinctive-responsibility.glitch.me/api/user', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          setResponse(data);
          SetisPending(false);
          setError(null);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          setResponse(null);
          setError('There was a problem creating the user.');
        });
    }
    useEffect(() => {
        if (localStorage.getItem("address") === null) {
          create_user();
        } else {
            <div className= "signup">
            <h2>You are already logged in!!</h2>
            <button onClick={() => {
                navigate("/")
            }}>Return home</button>
        </div>
        }
      }, [address]);

  
    return (
        <div className="signup">
            {isPending && <p>Loading....</p>}
            {response  && <Signupinfo response={response} />}
            {error && <pre>{error}</pre>}
        </div>
    );
}

export default SignUp;