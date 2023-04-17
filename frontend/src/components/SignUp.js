import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Signupinfo from "./SignupInfo";

const IsLoggedin = () => {
  const navigate = useNavigate();
  return (
    <div className="signup">
      <h2>You are already logged in!!</h2>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Return home
      </button>
    </div>
  );
};

const SignUp = () => {
  const user = localStorage.getItem("user");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const create_user = () => {
    fetch("https://grove-instinctive-responsibility.glitch.me/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setResponse(data);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setResponse(null);
        setError("There was a problem creating the user.");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      create_user();
    }
  }, [user]);

  return (
    <div className="signup">
      {user ? (
        <IsLoggedin />
      ) : (
        <>
          {isPending && <p>Loading....</p>}
          {response && <Signupinfo response={response} />}
          {error && <pre>{error}</pre>}
        </>
      )}
    </div>
  );
};

export default SignUp;
