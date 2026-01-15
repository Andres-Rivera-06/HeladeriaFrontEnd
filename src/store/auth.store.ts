import { create } from "zustand";

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // Login logic will be implemented here
  },
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
