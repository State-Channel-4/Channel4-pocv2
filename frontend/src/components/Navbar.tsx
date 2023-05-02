import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

const Navbar = () => {
  const [isLoggedIn, setLogin] = useState(false);
  const [change, setChange] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [change]);
  console.log(isLoggedIn);

    return (
      <nav className="navbar">
        <h1>Channel4</h1>
        <div className="links">
        <NavLink to="/" className="navbar-link-active">Home</NavLink>
        {isLoggedIn && <NavLink to="/submit-url">Submit url</NavLink>}
        {isLoggedIn && <NavLink to="/submit-tag">Submit tag</NavLink>}
        {isLoggedIn &&
          <button
          onClick={() => {
          localStorage.removeItem("user");
          setChange((change) => !change);
          navigate('/')
          }}>
        Logout</button> }
        {!isLoggedIn && <NavLink to="/login">Login</NavLink> }
        {!isLoggedIn && <NavLink to="/signup">SignUp</NavLink> }

        </div>
      </nav>
    );
  }

  export default Navbar;