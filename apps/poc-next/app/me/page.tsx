"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useEncryptedStore } from "@/store/encrypted"
import { usePasswordStore } from "@/store/password"
import { Copy } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

import { cn } from "@/lib/utils"
import RequireAuth from "@/components/helper/RequireAuth"

const Account = () => {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [submittedURLs, setSubmittedURLs] = useState(0)
  const [likedURLs, setLikedURLs] = useState(0)
  const { address } = useEncryptedStore()
  const { userId, token } = usePasswordStore()
  const [shownAddress, setShownAddress] = useState("No address found")

  useEffect(() => {
    ;(async () => {
      try {
        if (address) {
          const prefix = address.replace(/(.{5})..+/, "$1…")
          const postfix = address.substring(address.length - 4, address.length)
          setShownAddress(prefix + postfix)
        }
        const { user } = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json())
        setSubmittedURLs(user.submittedUrls.length)
        setLikedURLs(user.likedUrls.length)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [address, userId, token, router])

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <RequireAuth>
      <section className="mx-auto flex max-w-xl flex-col gap-6 p-6">
        <h2 className="text-left font-semibold">My account</h2>
        <div className="bg-c4-gradient-separator h-0.5"></div>
        <div className="flex h-full flex-col gap-8 rounded-lg bg-slate-900 p-6">
          <Row>
            <p className="font-semibold">Submitted URLs</p>
            <p>{submittedURLs}</p>
          </Row>
          <Row>
            <p className="font-semibold">Likes</p>
            <p>{likedURLs}</p>
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
              value={address}
              size={180}
              level="H"
              className="w-fit rounded-lg bg-white p-2"
            />
            <p className="p-2"></p>
            <p className="text-slate-400">{shownAddress}</p>
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
          </div>
        </div>
      </section>
    </RequireAuth>
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
