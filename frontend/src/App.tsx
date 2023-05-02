import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import SubmitUrl from './pages/SubmitUrl'

import Navbar from './components/Navbar'
import SubmitTag from './components/SubmitTag'
import RecoverAccount from './pages/RecoverAccount'
import DiscoverFrame from './components/DiscoverFrame'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/submit-url" element={<SubmitUrl />}></Route>
            <Route path="/submit-tag" element={<SubmitTag />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/discover" element={<DiscoverFrame />}></Route>
            <Route path="/recover-account" element={<RecoverAccount />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App