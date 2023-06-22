import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type Store = {
  userId: string | null
  token: string | null
  password: string | null
  updateUserId: (data: string | null) => void
  updateToken: (data: string | null) => void
  updatePassword: (data: string | null) => void
}

export const usePasswordStore = create<Store>()(
  persist(
    (set) => ({
      userId: null,
      token: null,
      password: null,
      updateUserId: (data) => set({ userId: data }),
      updateToken: (data) => set({ token: data }),
      updatePassword: (data) => set({ password: data }),
    }),
    {
      name: "channel-4-password",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
