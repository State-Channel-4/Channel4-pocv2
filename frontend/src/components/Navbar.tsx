/// <reference types="vite-plugin-svgr/client" />

import { NavLink } from "react-router-dom"
import { RiHomeSmile2Line, RiArrowRightUpLine } from "react-icons/ri"
import { ReactComponent as Channel4Icon } from "../assets/channel-4-icon-v2.svg"

type Props = {
  iconColor?: string
}

const Navbar = ({ iconColor = '#E4E4E4'}: Props) => {

  // check remix icons names in https://react-icons.github.io/react-icons/icons?name=ri
  return (
    <nav className="bg-dark fixed top-0 left-0 w-screen flex px-2 py-5 justify-between">
      <NavLink to="/" className="flex bg-transparent items-center cursor-pointer mx-3">
        <RiHomeSmile2Line size="25px" fill={iconColor}/>
      </NavLink>

      <NavLink to="/discover" className="flex items-center bg-gray p-2 mx-3 rounded-lg w-80 justify-center cursor-pointer drop-shadow-md">
        <Channel4Icon width="25px" height="100%"/>
        <h1 className="text-white ml-3 font-title font-semibold tracking-wide">Switch</h1>
      </NavLink>

      <NavLink to="/" className="flex bg-transparent items-center cursor-pointer mx-3">
        <RiArrowRightUpLine size="25px" fill={iconColor}/>
      </NavLink>
    </nav>
  )
}

export default Navbar;