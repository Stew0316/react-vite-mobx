import { useEffect } from "react";
import { useDictStore } from "@/store/dict";
import { useLocation } from "react-router";

export function useStartApp() {
  // 获取所有的dict，写入store里
  const getDict = useDictStore((state) => state.getDict);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      getDict();
    }
  }, [getDict, location]);
}
