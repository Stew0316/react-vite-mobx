import { useEffect } from "react";
import { useDictStore } from "@/store/dict";

export function useStartApp() {
  // 获取所有的dict，写入store里
  const getDict = useDictStore((state) => state.getDict);

  useEffect(() => {
    getDict();
  }, [getDict]);
}
