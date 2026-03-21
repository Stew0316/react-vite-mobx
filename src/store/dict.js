import { create } from "zustand";
import { getDictAll } from "@/api/system/dict";

export const useDictStore = create((set, get) => ({
  dictArrObject: {},
  dictMapObject: {},

  setDict: (dicts = []) => {
    const dictMapObject = {};
    for (const key in dicts) {
      const dictItem = dicts[key];
      const itemMap = {};
      for (const item of dictItem) {
        itemMap[item.value] = item.label;
      }
      dictMapObject[key] = itemMap;
    }
    set({
      dictArrObject: dicts,
      dictMapObject,
    });
  },
  getDict: async () => {
    const res = await getDictAll();
    get().setDict(res);
  },
}));
