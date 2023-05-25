import { HDNodeWallet, Wallet } from "ethers"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type Store = {
  wallet: Wallet | HDNodeWallet | null
  updateWallet: (data: Wallet | HDNodeWallet | null) => void
}

export const useWalletStore = create<Store>()(
  persist(
    (set) => ({
      wallet: null,
      updateWallet: (data) => set({ wallet: data }),
    }),
    {
      name: "channel-4-wallet",
    }
  )
)
