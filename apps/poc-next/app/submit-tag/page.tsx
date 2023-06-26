"use client"

import { useState } from "react"
import Image from "next/image"
import { useEncryptedStore } from "@/store/encrypted"
import { usePasswordStore } from "@/store/password"
import { Wallet } from "ethers"

import { getRawTransactionToSign } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import RequireAuth from "@/components/helper/RequireAuth"

import Channel4IconBlack from "../../assets/channel-4-icon-black.svg"

const SubmitTag = () => {
  const { encrypted } = useEncryptedStore()
  const { password, token, userId } = usePasswordStore()
  const [name, setName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onNameChangeHandler = (e: { target: { value: string } }) => {
    setName(e.target.value)
  }

  const onClickCreateHandler = async () => {
    setIsLoading(true)
    const functionName = "createTagIfNotExists"
    const params = [name]
    const metaTx = await getRawTransactionToSign(functionName, params)
    const wallet = Wallet.fromEncryptedJsonSync(encrypted!, password!)
    const signedSubmitTagtx = await wallet?.signTransaction(metaTx)
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        signedMessage: signedSubmitTagtx,
        address: wallet.address,
        functionName: functionName,
        params: params,
        // TODO: temp params for mongodb
        userId: userId,
      }),
    }).then((res) => res.json())
    console.log(response)
    setName(null)
    setIsLoading(false)
  }

  return (
    <RequireAuth>
      <div className="mx-7 flex flex-col justify-center lg:container">
        <div className="bg-c4-gradient-main my-5 flex h-40 justify-center rounded-br-3xl rounded-tl-3xl">
          <Image priority src={Channel4IconBlack} alt="Channel 4 icon black" />
        </div>
        <h2 className="my-5">
          Share your favourite websites & <span className="">spark joy</span> in
          our community with <span className="">random gems!</span> 🌐✨
        </h2>
        <div className="space-y-2 pb-4">
          <p>Enter tag name here</p>
          <input
            type={"text"}
            value={name || ""}
            onChange={onNameChangeHandler}
            className="bg-gray h-12 w-full rounded-lg px-2 py-1"
          />
        </div>
        <Button
          variant="outline"
          loading={isLoading}
          disabled={isLoading}
          onClick={onClickCreateHandler}
          className="rounded-full border-green-500 py-6 text-green-500"
        >
          Share it with the world
        </Button>
      </div>
    </RequireAuth>
  )
}

export default SubmitTag
