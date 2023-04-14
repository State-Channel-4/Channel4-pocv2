import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setLogin] = useState();
  const [change, setChange] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("address") !== null) {
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
        <NavLink to="/" activeClassName="navbar-link-active">Home</NavLink>
        <NavLink to="/submit-url">Submit url</NavLink>
        {isLoggedIn && 
          <button
          onClick={() => {
          localStorage.removeItem("address");
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