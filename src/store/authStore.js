import { create } from "zustand";
import { LOCAL_ENV } from "@/common/localData";
import { getUserInfo as getUserData } from "@/api/auth/userInfo";
import { SUPER_ADMIN } from "@/constant/system";

export const useAuthStore = create((set) => ({
  token: localStorage.getItem(`${LOCAL_ENV.VITE_MAIN_KEY}-token`) || null,
  userInfo: {},
  menus: [],
  effctTenantId: null,
  refreshKey: 0,
  setEffctTenantId: (id) =>
    set((state) => ({ effctTenantId: id, refreshKey: state.refreshKey + 1 })),

  setAuth: (token, userInfo) => set({ token, userInfo }),
  setMenus: (menus) => set({ menus }),
  clearAuth: () => set({ token: null, userInfo: null, menus: [] }),
  isSuperAdmin: () => {
    const userInfo = get().userInfo;
    return userInfo.roles && userInfo.roles.includes(SUPER_ADMIN);
  },
  getUserInfo: async () => {
    const res = await getUserData();
    set({ userInfo: res });
  },
}));
