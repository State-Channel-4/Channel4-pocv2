import React, { useEffect, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { RiCheckboxMultipleBlankLine } from "react-icons/ri"

const Account = () => {
  const [address, setAddress] = useState("qZw89134ads123aaodaBx") // localStorage.getItem('address')
  const [shownAddress, setShownAddress] = useState("")

  useEffect(() => {
    const prefix = address.replace(/(.{5})..+/, "$1…")
    const postfix = address.substring(address.length - 4, address.length)
    setShownAddress(prefix + postfix)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = () => {
    console.log("click")
    const input = document.createElement("input")
    input.setAttribute("value", address)
    document.body.appendChild(input)
    input.select()
    document.execCommand("copy")
    document.body.removeChild(input)
  }
  return (
    <div className="mx-6 text-white">
      <h1 className="text-left font-title font-semibold">My account</h1>
      <div className="h-0.5 bg-c4-gradient-separator"></div>
      <div className="mt-6 h-full rounded-lg bg-gray px-3 py-6">
        <Row>
          <p className="">Submitted URLs</p>
          <p>99</p>
        </Row>
        <Row>
          <p>Likes</p>
          <p>23</p>
        </Row>
        <Row>
          <p>Network</p>
          <div className="flex flex-row items-center rounded-lg">
            <div className="mr-2 h-2 w-2 rounded-full bg-green-400"></div>
            <p>Sepolia</p>
          </div>
        </Row>
        <div className=" mb-4 flex justify-center">
          <QRCodeSVG
            value={address}
            size={180}
            level="H"
            className="w-fit rounded-lg bg-white p-4"
          />
        </div>
        <button
          onClick={handleClick}
          className="m-auto flex w-60 cursor-pointer items-center justify-center rounded-lg bg-light p-1 drop-shadow-md"
        >
          {shownAddress}
          <RiCheckboxMultipleBlankLine
            size="25px"
            fill="#E4E4E4"
            className="ml-3"
          />
        </button>
      </div>
    </div>
  )
}

type RowProps = {
  children: React.ReactNode
}

const Row = ({ children }: RowProps) => {
  return (
    <div className="mb-10 flex justify-between border-b border-gray-light pb-3 font-text font-light">
      {children}
    </div>
  )
}

export default Account
