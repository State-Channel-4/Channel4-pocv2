import { create } from "zustand"

type Store = {
  password: string | null
  updatePassword: (data: string | null) => void
}

export const usePasswordStore = create<Store>((set) => ({
  password: null,
  updatePassword: (data) => set({ password: data }),
}))
