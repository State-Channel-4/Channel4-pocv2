"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { RiCloseLine, RiHeartFill, RiMenu2Line } from "react-icons/ri"

import { siteConfig } from "@/config/site"

import Channel4Icon from "../assets/channel-4-icon-v2.svg"
import { Button } from "./ui/button"

type Props = {
  iconColor?: string
}

export function BottomNavigation({ iconColor = "#D0D1D2" }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleURLClick = () => {
    setIsMenuOpen(false)
  }

  // check remix icons names in https://react-icons.github.io/react-icons/icons?name=ri
  return (
    <div className="fixed bottom-0 left-0 w-screen">
      {isMenuOpen ? (
        <nav className="bg-c4-gradient-green flex flex-col gap-6 rounded-t-3xl px-3 py-8 font-semibold text-black">
          <Link href={siteConfig.links.signUp} onClick={handleURLClick}>
            Sign Up
          </Link>
          <Link href={siteConfig.links.submitUrl} onClick={handleURLClick}>
            Submit URL
          </Link>
          <Link href={siteConfig.links.submitTag} onClick={handleURLClick}>
            Add tags to this site
          </Link>
          <Link href={window.location.href} target="_blank">
            Open this page in a new tab
          </Link>
        </nav>
      ) : null}
      <div className="bg-dark">
        <nav className="flex w-screen justify-between px-3 py-5 lg:container lg:px-0">
          <Link
            href={siteConfig.links.discover}
            className="bg-gray flex w-60 cursor-pointer items-center justify-center rounded-lg p-2 drop-shadow-md"
          >
            <Image priority src={Channel4Icon} alt="Channel 4 Icon" />
            <h1 className="font-title ml-3 text-base font-semibold tracking-wide text-white">
              Discover
            </h1>
          </Link>

          <div className="flex justify-end gap-6">
            <Link
              href={siteConfig.links.home}
              className="flex cursor-pointer items-center bg-transparent"
            >
              <RiHeartFill size="25px" fill={iconColor} />
            </Link>

            <Button
              onClick={handleMenuClick}
              variant={"ghost"}
              className="flex cursor-pointer items-center bg-transparent"
            >
              {isMenuOpen ? (
                <RiCloseLine size="25px" fill={iconColor} />
              ) : (
                <RiMenu2Line size="25px" fill={iconColor} />
              )}
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}
