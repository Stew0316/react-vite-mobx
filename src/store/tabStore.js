import { create } from "zustand";

import { SESSION_KEY } from "@/constant/storage";

// 从 sessionStorage 恢复标签列表
const loadTabs = () => {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || [];
  } catch {
    return [];
  }
};

const saveTabs = (tabs) => {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(tabs));
};

export const useTabStore = create((set, get) => ({
  tabs: loadTabs(),
  // 添加或激活 tab
  addTab: (tab) => {
    const { tabs } = get();
    const exists = tabs.find((t) => t.key === tab.key);
    if (!exists) {
      const newTabs = [...tabs, tab];
      saveTabs(newTabs);
      set({ tabs: newTabs, activeKey: tab.key });
    } else {
      set({ activeKey: tab.key });
    }
  },
  removeTab: (key) => {
    const { tabs, activeKey } = get();
    const index = tabs.findIndex((t) => t.key === key);
    if (index === -1) return;
    const newTabs = tabs.filter((t) => t.key !== key);
    saveTabs(newTabs);
    // 关闭当前激活的 tab 时，自动跳到相邻 tab
    let newActiveKey = activeKey;
    if (activeKey === key) {
      newActiveKey = newTabs[index]?.key ?? newTabs[index - 1]?.key ?? "";
    }
    set({ tabs: newTabs, activeKey: newActiveKey });
  },
  setActiveKey: (key) => set({ activeKey: key }),

  clearTabs: () => {
    sessionStorage.removeItem(SESSION_KEY);
    set({ tabs: [], activeKey: "" });
  },
}));
