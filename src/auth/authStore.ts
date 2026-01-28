import { create } from "zustand";
import type { AuthUser } from "../types/auth";

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

export const authStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
