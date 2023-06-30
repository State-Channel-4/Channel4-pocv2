"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEncryptedStore } from "@/store/encrypted"
import { usePasswordStore } from "@/store/password"
import { Wallet } from "ethers"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"

import BustOfWomanWithFlowers from "../../assets/bust-of-woman-with-flowers.svg"
import Channel4IconBlack from "../../assets/channel-4-icon-black.svg"

const SignIn = () => {
  const router = useRouter()
  const { encrypted, updateEncrypted } = useEncryptedStore()
  const { password, updateUserId, updateToken, updatePassword } =
    usePasswordStore()
  const [error, setError] = useState<string | null>(null)
  const [hasAKey, setHasAKey] = useState(false)
  const [key, setKey] = useState<string | null>(null)
  const [encryptedExists, setEncryptedExists] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onPasswordChangeHandler = (e: { target: { value: string } }) => {
    updatePassword(e.target.value)
  }

  const clickLetMeInHandler = async () => {
    setIsLoading(true)
    try {
      const wallet = Wallet.fromEncryptedJsonSync(encrypted!, password!)
      const signedMessage = await wallet.signMessage(
        process.env.NEXT_PUBLIC_API_LOGIN_SECRET!
      )
      const { user, token, message } = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ signedMessage }),
        }
      ).then((response) => response.json())
      // handle any server error messages
      if (message) throw new Error(message)

      updateUserId(user._id)
      updateToken(token)
      router.push(siteConfig.links.me)
    } catch (error: any) {
      if (error.message.includes("incorrect password")) {
        setError("Incorrect password. Please try again.")
      } else if (error.message.includes("User not found")) {
        setError(
          "User not found in the current database. Please delete your local key and try again."
        )
      } else {
        console.log(error.message)
        setError("Something went wrong. Check the console for more details.")
      }
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
    setIsLoading(false)
  }

  const clickDeleteHandler = () => {
    setIsLoading(true)
    updateEncrypted(null)
    updatePassword(null)
    updateUserId(null)
    updateToken(null)
    setHasAKey(false)
    setKey(null)
    setEncryptedExists(false)
    setIsLoading(false)
  }

  const clickStartJourneyHandler = () => {
    setIsLoading(true)
    if (encrypted) {
      setEncryptedExists(true)
    } else {
      router.push(siteConfig.links.signUp)
    }
    setIsLoading(false)
  }

  const onLoadKeyChangeHandler = (e: { target: { value: string } }) => {
    setKey(e.target.value)
  }

  const clickLoadKeyHandler = () => {
    setIsLoading(true)
    updateEncrypted(key)
    updatePassword(null)
    setEncryptedExists(true)
    setIsLoading(false)
  }

  const clickCancelKeyHandler = () => {
    setIsLoading(true)
    setHasAKey(false)
    setKey(null)
    setIsLoading(false)
  }

  const clickAlreadyHaveKeyHandler = () => {
    setIsLoading(true)
    setHasAKey(true)
    setIsLoading(false)
  }

  return (
    <div className="mx-7 flex flex-col justify-center lg:container">
      <div className="bg-c4-gradient-main my-5 flex h-40 justify-evenly rounded-br-3xl rounded-tl-3xl">
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
              value={password || ""}
              onChange={onPasswordChangeHandler}
              className="bg-gray w-full rounded-sm px-2 py-1"
            />
          </div>
          <Button
            variant="outline"
            loading={isLoading}
            disabled={isLoading}
            onClick={clickLetMeInHandler}
            className="w-full rounded-full border-green-500 py-6 text-green-500"
          >
            Let me in
          </Button>
          <Button
            variant="outline"
            disabled={isLoading}
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
            loading={isLoading}
            disabled={isLoading}
            onClick={clickStartJourneyHandler}
            className="rounded-full border-green-500 py-6 text-green-500"
          >
            Start your journey
          </Button>
          {hasAKey ? (
            <div className="my-5 mb-24 flex flex-col items-center space-y-5">
              <p>Your key:</p>
              <input
                type={"text"}
                value={key || ""}
                onChange={onLoadKeyChangeHandler}
                className="bg-gray h-40 w-full rounded-sm px-2"
              />
              <Button
                variant="outline"
                loading={isLoading}
                disabled={isLoading}
                onClick={clickLoadKeyHandler}
                className="rounded-full border-green-500 py-6 text-green-500"
              >
                Load key
              </Button>
              <Button
                variant="outline"
                loading={isLoading}
                disabled={isLoading}
                onClick={clickCancelKeyHandler}
                className="mt-4 rounded-full border-transparent py-6 text-green-500 hover:border-green-500"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                loading={isLoading}
                disabled={isLoading}
                onClick={clickAlreadyHaveKeyHandler}
                className="mt-4 rounded-full border-transparent py-6 text-green-500 hover:border-green-500"
              >
                Do you have a key to upload?
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default SignIn
