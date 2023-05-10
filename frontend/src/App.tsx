import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Account from './pages/Account'
import SubmitUrl from './pages/SubmitUrl'

import Navbar from './components/Navbar'
import SubmitTag from './components/SubmitTag'
import RecoverAccount from './pages/RecoverAccount'
import DiscoverFrame from './components/DiscoverFrame'
import RequireAuth from './components/helper/RequireAuth'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'


function App() {
  return (
    <Router>
        <Navbar />
        <div className="mt-20 w-full h-screen bg-black">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route
              path="/submit-url"
              element={
                <RequireAuth>
                  <SubmitUrl />
                </RequireAuth>
              }
            />
            <Route
              path="/submit-tag"
              element={
                <RequireAuth>
                  <SubmitTag />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route
              path="/account"
              element={
                <RequireAuth>
                  <Account />
                </RequireAuth>
              }
            />
            <Route path="/discover" element={<DiscoverFrame />}/>
            <Route path="/recover-account" element={<RecoverAccount />}/>
          </Routes>
        </div>
    </Router>
  )
}

export default App