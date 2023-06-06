import { JsonRpcProvider, Wallet } from "ethers"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type Store = {
  encrypted: string | null
  provider: JsonRpcProvider | null
  address: string
  createEncrypted: (password: string) => Promise<string | null>
  updateEncrypted: (data: string | null) => void
}

export const useEncryptedStore = create<Store>()(
  persist(
    (set, get) => ({
      encrypted: null,
      provider: null,
      address: "No address found",
      createEncrypted: async (password: string) => {
        if (get().encrypted) return null
        const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL!)
        const wallet = Wallet.createRandom(provider)
        const encrypted = await wallet.encrypt(password)
        set({
          encrypted: encrypted,
          provider: provider,
          address: wallet.address,
        })
        return encrypted
      },
      updateEncrypted: (data) => set({ encrypted: data }),
    }),
    {
      name: "channel-4-encrypted",
    }
  )
)
