import { create } from "zustand";
import { LOCAL_ENV } from "@/common/localData";

export const useAuthStore = create((set) => ({
  token: localStorage.getItem(`${LOCAL_ENV.VITE_MAIN_KEY}-token`) || null,
  userInfo: null,
  menus: [],

  setAuth: (token, userInfo) => set({ token, userInfo }),
  setMenus: (menus) => set({ menus }),
  clearAuth: () => set({ token: null, userInfo: null, menus: [] }),
}));
