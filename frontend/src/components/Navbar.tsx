/// <reference types="vite-plugin-svgr/client" />

import { NavLink } from "react-router-dom"
import { RiMenu2Line, RiHeartFill, RiCloseLine } from "react-icons/ri"
import { ReactComponent as Channel4Icon } from "../assets/channel-4-icon-v2.svg"
import { useState } from "react"

type Props = {
  iconColor?: string
}

const Navbar = ({ iconColor = '#D0D1D2'}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }


  // check remix icons names in https://react-icons.github.io/react-icons/icons?name=ri
  return (
    <div className="fixed bottom-0 left-0">
      {
        isMenuOpen ?
          <nav className="flex flex-col gap-6 bg-c4-gradient-green rounded-t-3xl py-8 px-3 font-semibold">
            <NavLink to="/account">
              Create account
            </NavLink>
            <NavLink to="/submit-url">
              Submit URL
            </NavLink>
            <NavLink to="/submit-tag">
              Add tags to this site
            </NavLink>
            <NavLink to={window.location.href} target="_blank">
              Open this page in a new tab
            </NavLink>
          </nav>
        :
          null
      }
      <nav className="bg-dark w-screen flex px-2 py-5 justify-between">
        <NavLink to="/discover" className="flex items-center bg-gray p-2 mx-3 rounded-lg w-80 justify-center cursor-pointer drop-shadow-md">
          <Channel4Icon width="25px" height="100%"/>
          <h1 className="text-white ml-3 font-title font-semibold tracking-wide">Discover</h1>
        </NavLink>

        <NavLink to="/" className="flex bg-transparent items-center cursor-pointer mx-3">
          <RiHeartFill size="25px" fill={iconColor}/>
        </NavLink>

        <NavLink to="#" onClick={handleMenuClick} className="flex bg-transparent items-center cursor-pointer mx-3">
          {
            isMenuOpen ?
              <RiCloseLine size="25px" fill={iconColor}/>
            :
              <RiMenu2Line size="25px" fill={iconColor}/>
          }
        </NavLink>
      </nav>
    </div>
  )
}

export default Navbar;