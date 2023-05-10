import "./App.css"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import DiscoverFrame from "./components/DiscoverFrame"
import Navbar from "./components/Navbar"
import SubmitTag from "./components/SubmitTag"
import RequireAuth from "./components/helper/RequireAuth"
import Account from "./pages/Account"
import Home from "./pages/Home"
import Login from "./pages/Login"
import RecoverAccount from "./pages/RecoverAccount"
import SignUp from "./pages/SignUp"
import SubmitUrl from "./pages/SubmitUrl"

function App() {
  return (
    <Router>
      <Navbar />
      <main className="mt-20 h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/account"
            element={
              <RequireAuth>
                <Account />
              </RequireAuth>
            }
          />
          <Route path="/discover" element={<DiscoverFrame />} />
          <Route path="/recover-account" element={<RecoverAccount />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
