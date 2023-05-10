/// <reference types="vite-plugin-svgr/client" />

import { RiArrowRightUpLine, RiHomeSmile2Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";



import { ReactComponent as Channel4Icon } from "../assets/channel-4-icon-v2.svg"

// type Props = {
//   iconColor?: string
// }

const Navbar = () => {
  // check remix icons names in https://react-icons.github.io/react-icons/icons?name=ri
  return (
    <nav className="fixed top-0 flex w-full justify-between bg-dark px-2 py-5">
      <NavLink
        to="/"
        className="mx-3 flex cursor-pointer items-center bg-transparent"
      >
        <RiHomeSmile2Line size="25px" fill="currentColor" />
      </NavLink>

      <NavLink
        to="/discover"
        className="mx-3 flex w-80 cursor-pointer items-center justify-center rounded-lg bg-gray p-2 drop-shadow-md"
      >
        <Channel4Icon width="25px" height="100%" />
        <h1 className="ml-3 font-title font-semibold tracking-wide text-white">
          Switch
        </h1>
      </NavLink>

      <NavLink
        to="/"
        className="mx-3 flex cursor-pointer items-center bg-transparent"
      >
        <RiArrowRightUpLine size="25px" fill="currentColor" />
      </NavLink>
    </nav>
  )
}

export default Navbar