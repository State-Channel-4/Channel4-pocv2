"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEncryptedStore } from "@/store/encrypted"
import { useWalletStore } from "@/store/wallet"
import { Wallet } from "ethers"

import { Button } from "@/components/ui/button"

import BustOfWomanWithFlowers from "../../assets/bust-of-woman-with-flowers.svg"
import Channel4IconBlack from "../../assets/channel-4-icon-black.svg"

const SignUp = () => {
  const router = useRouter()
  const { encrypted, updateEncrypted } = useEncryptedStore()
  const { updateWallet } = useWalletStore()
  const [password, setPassword] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [encryptedExists, setEncryptedExists] = useState(false)

  const onPasswordChangeHandler = (e: { target: { value: string } }) => {
    setPassword(e.target.value)
  }

  const clickLetMeInHandler = () => {
    try {
      const wallet = Wallet.fromEncryptedJsonSync(encrypted!, password!)
      updateWallet(wallet)
      router.push("/discover")
    } catch (error: any) {
      setError(error.message)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const clickDeleteHandler = () => {
    updateEncrypted(null)
    updateWallet(null)
  }

  const clickStartJourneyHandler = () => {
    if (encrypted) {
      setEncryptedExists(true)
    } else {
      router.push("/create-account")
    }
  }

  return (
    <div className="mx-7 flex flex-col justify-center">
      <div className="bg-c4-gradient-main my-5 flex h-40 rounded-br-3xl rounded-tl-3xl">
        <Image
          priority
          className="relative top-12 z-10"
          src={BustOfWomanWithFlowers}
          alt="Bust of woman with flowers"
        />
        <Image priority src={Channel4IconBlack} alt="Channel 4 icon black" />
      </div>
      <h2 className="my-5">
        transverse <span className="">random content</span> from all over the
        internet.
      </h2>
      <p className="my-5">
        Unlock a world of surprises and laughter with Channel 4! Explore random
        content, and submit the creative gems with our community. 🎉✨
      </p>
      {encryptedExists ? (
        <div className="flex flex-col items-start space-y-5">
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex w-full items-center space-x-5">
            <p>Password:</p>
            <input
              type={"password"}
              onChange={onPasswordChangeHandler}
              className="bg-gray w-full rounded-sm px-2 py-1"
            />
          </div>
          <Button
            variant="outline"
            onClick={clickLetMeInHandler}
            className="w-full rounded-full border-green-500 py-6 text-green-500"
          >
            Let me in
          </Button>
          <Button
            variant="outline"
            onClick={clickDeleteHandler}
            className="w-full rounded-full border-transparent py-6 text-green-500"
          >
            Delete local key
          </Button>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <Button
            variant="outline"
            onClick={clickStartJourneyHandler}
            className="rounded-full border-green-500 py-6 text-green-500"
          >
            Start your journey
          </Button>
          <Button
            variant="outline"
            className="mt-4 rounded-full border-transparent py-6 text-green-500 hover:border-green-500"
          >
            Already have the key?
          </Button>
        </div>
      )}
    </div>
  )
}

export default SignUp
