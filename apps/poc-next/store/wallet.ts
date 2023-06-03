import { HDNodeWallet, JsonRpcProvider, Wallet } from "ethers"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type Store = {
  wallet: Wallet | HDNodeWallet | null
  provider: JsonRpcProvider | null
  createWallet: (password: string) => Promise<string | null>
  updateWallet: (data: Wallet | HDNodeWallet | null) => void
}

export const useWalletStore = create<Store>()(
  persist(
    (set, get) => ({
      wallet: null,
      provider: null,
      createWallet: async (password) => {
        if (get().wallet) return null
        const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL!)
        const wallet = Wallet.createRandom(provider)
        const encrypted = await wallet.encrypt(password)
        set({ wallet: wallet, provider: provider })
        return encrypted
      },
      updateWallet: (data) => set({ wallet: data }),
    }),
    {
      name: "channel-4-wallet",
    }
  )
)
