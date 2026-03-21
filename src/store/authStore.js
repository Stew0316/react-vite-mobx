import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  userInfo: null,
  menus: [],

  setAuth: (token, userInfo) => set({ token, userInfo }),
  setMenus: (menus) => set({ menus }),
  clearAuth: () => set({ token: null, userInfo: null, menus: [] }),
}));
