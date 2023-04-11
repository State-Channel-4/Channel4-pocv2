import Home from "./components/Home";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
          <Route exact path="/" element={<Home />}></Route>
          </Routes>
        </div>
      </div>
    </Router>

  );
}

export default App;
