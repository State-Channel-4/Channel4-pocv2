"use client"

import { ReactNode, useState } from "react"
import { useRouter } from "next/navigation"
import { useEncryptedStore } from "@/store/encrypted"
import { useWalletStore } from "@/store/wallet"
import { Copy } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Account = () => {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const { updateEncrypted } = useEncryptedStore()
  const { wallet, updateWallet } = useWalletStore()

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet?.address || "No address found")
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const clickDeleteHandler = () => {
    updateEncrypted(null)
    updateWallet(null)
    router.push("/")
  }

  return (
    <section className="mx-auto flex max-w-xl flex-col gap-6 p-6">
      <h2 className="text-left font-semibold">My account</h2>
      <div className="bg-c4-gradient-separator h-0.5"></div>
      <div className="flex h-full flex-col gap-8 rounded-lg bg-slate-900 p-6">
        <Row>
          <p className="font-semibold">Submitted URLs</p>
          <p>99</p>
        </Row>
        <Row>
          <p className="font-semibold">Likes</p>
          <p>23</p>
        </Row>
        <Row>
          <p className="font-semibold">Network</p>
          <div className="inline-flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <p>Sepolia</p>
          </div>
        </Row>
        <div className="mx-auto flex flex-col items-center">
          <QRCodeSVG
            value={wallet?.address || "No address found"}
            size={180}
            level="H"
            className="w-fit rounded-lg bg-white p-2"
          />
          <p className="p-2"></p>
          <p className="text-slate-400">
            {wallet?.address || "No address found"}
          </p>
          <button
            onClick={copyAddress}
            className={cn(
              "flex items-center justify-center gap-2 p-1 drop-shadow-md transition hover:opacity-80",
              copied ? "text-green-400" : "text-white"
            )}
          >
            <span>{copied ? "Copied!" : "Copy to clipboard"}</span>
            <Copy size={12} />
          </button>
          {wallet?.address && (
            <Button
              variant="outline"
              onClick={clickDeleteHandler}
              className="mt-10 w-full rounded-full border-transparent py-6 text-green-500"
            >
              Delete local key
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

const Row = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between border-b-2 border-slate-500/50 pb-4">
      {children}
    </div>
  )
}

export default Account
