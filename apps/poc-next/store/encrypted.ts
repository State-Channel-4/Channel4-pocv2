import { create } from "zustand"
import { persist } from "zustand/middleware"

type Store = {
  encrypted: string | null
  updateEncrypted: (data: string | null) => void
}

export const useEncryptedStore = create<Store>()(
  persist(
    (set) => ({
      encrypted: null,
      updateEncrypted: (data) => set({ encrypted: data }),
    }),
    {
      name: "channel-4-encrypted",
    }
  )
)
