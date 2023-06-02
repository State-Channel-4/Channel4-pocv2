import { HDNodeWallet, Wallet, getDefaultProvider } from "ethers"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type Store = {
  wallet: Wallet | HDNodeWallet | null
  createWallet: (password: string) => Promise<string | null>
  updateWallet: (data: Wallet | HDNodeWallet | null) => void
}

export const useWalletStore = create<Store>()(
  persist(
    (set, get) => ({
      wallet: null,
      createWallet: async (password) => {
        if (get().wallet) return null
        const provider = getDefaultProvider("sepolia")
        const wallet = Wallet.createRandom(provider)
        const encrypted = await wallet.encrypt(password)
        set({ wallet: wallet })
        return encrypted
      },
      updateWallet: (data) => set({ wallet: data }),
    }),
    {
      name: "channel-4-wallet",
    }
  )
)
