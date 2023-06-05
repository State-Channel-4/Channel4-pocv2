"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEncryptedStore } from "@/store/encrypted"
import { usePasswordStore } from "@/store/password"
import { Wallet } from "ethers"

import { Button } from "@/components/ui/button"

const CreateAccount = () => {
  const router = useRouter()
  const [isKeyDownloaded, setIsKeyDownloaded] = useState(false)
  const [isWalletCreated, setIsWalletCreated] = useState(false)
  const { password, updateUserId, updateToken, updatePassword } =
    usePasswordStore()
  const [error, setError] = useState<string | null>(null)
  const { encrypted, createEncrypted } = useEncryptedStore()

  const clickDownloadKeyHandler = async () => {
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
  }

  const clickAllDoneHandler = () => {
    router.push("/discover")
  }

  const onPasswordChangeHandler = (e: { target: { value: string } }) => {
    updatePassword(e.target.value)
  }

  const clickCreateAccountHandler = async () => {
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
        "There is already a wallet created internally. Please delete local storage and try again."
      )
    }
  }

  return (
    <div className="mx-7 flex h-full flex-col">
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
            onClick={clickDownloadKeyHandler}
            className="rounded-full border-green-500 py-6 text-green-500"
          >
            Download my private key
          </Button>
          <Button
            variant="outline"
            disabled={!isKeyDownloaded}
            onClick={clickAllDoneHandler}
            className="mt-4 rounded-full border-green-500 py-6 text-green-500 hover:border-green-500"
          >
            All done
          </Button>
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

export default CreateAccount
