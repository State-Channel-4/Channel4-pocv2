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

const SignUp = () => {
  const router = useRouter()
  const [isKeyDownloaded, setIsKeyDownloaded] = useState(false)
  const [isWalletCreated, setIsWalletCreated] = useState(false)
  const { password, updateUserId, updateToken, updatePassword } =
    usePasswordStore()
  const [error, setError] = useState<string | null>(null)
  const { encrypted, createEncrypted } = useEncryptedStore()
  const [isLoading, setIsLoading] = useState(false)

  const clickDownloadKeyHandler = async () => {
    setIsLoading(true)
    try {
      const element = document.createElement("a")
      const file = new Blob([encrypted!], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = "wallet.json"
      document.body.appendChild(element)
      element.click()
      setIsKeyDownloaded(true)
    } catch (error: any) {
      setError(error.message)
    }
    setIsLoading(false)
  }

  const clickAllDoneHandler = () => {
    setIsLoading(true)
    router.push(siteConfig.links.home)
    setIsLoading(false)
  }

  const onPasswordChangeHandler = (e: { target: { value: string } }) => {
    updatePassword(e.target.value)
  }

  const clickCreateAccountHandler = async () => {
    setIsLoading(true)
    const encryptedWallet = await createEncrypted(password!)
    if (encryptedWallet) {
      setIsWalletCreated(true)
      const wallet = Wallet.fromEncryptedJsonSync(encryptedWallet!, password!)
      const { user, token } = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: wallet.address }),
        }
      ).then((response) => response.json())

      updateUserId(user._id)
      updateToken(token)
    } else {
      setError(
        "There is already a wallet created internally. Please login and delete it to create a new one."
      )
    }
    setIsLoading(false)
  }

  return (
    <div className="mx-7 flex h-full flex-col lg:container">
      <div className="bg-c4-gradient-main my-5 flex h-40 justify-evenly rounded-br-3xl rounded-tl-3xl">
        <Image priority src={Channel4IconBlack} alt="Channel 4 icon black" />
        <Image
          priority
          className="relative top-12 z-10"
          src={BustOfWomanWithFlowers}
          alt="Bust of woman with flowers"
        />
      </div>
      <h2 className="my-5">This is not your typical creating account steps.</h2>
      <p className="my-5">
        We are creating a secret code just for you, and it will only be saved on
        your browser, not on our server or anywhere else. You will use this code
        to access your account and do things like submit website links for
        others to find and earn rewards later on.
      </p>
      {isWalletCreated ? (
        <div>
          <Button
            variant="outline"
            disabled={isLoading}
            loading={isLoading}
            loadingText="Generating key..."
            onClick={clickDownloadKeyHandler}
            className="rounded-full border-green-500 py-6 text-green-500"
          >
            Download my private key
          </Button>
          {isKeyDownloaded && (
            <Button
              variant="outline"
              onClick={clickAllDoneHandler}
              className="mt-4 rounded-full border-green-500 py-6 text-green-500 hover:border-green-500"
            >
              All done
            </Button>
          )}
        </div>
      ) : (
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
            loading={isLoading}
            disabled={isLoading}
            onClick={clickCreateAccountHandler}
            className="w-full rounded-full border-green-500 py-6 text-green-500"
          >
            Create account
          </Button>
        </div>
      )}
    </div>
  )
}

export default SignUp
