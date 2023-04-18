import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Submiturl from "./components/SubmitUrl"
import Login from "./components/Login"
import SignUp from "./components/SignUp";
import Submittag from "./components/SubmitTag";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DiscoverFrame from "./components/Discover";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/submit-url" element={<Submiturl />}></Route>
          <Route exact path="/submit-tag" element={<Submittag />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/discover" element={<DiscoverFrame />}></Route>
          </Routes>
        </div>
      </div>
    </Router>

  );
}

export default App;
