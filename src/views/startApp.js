import { useEffect } from "react";
import { useDictStore } from "@/store/dict";
import { useAuthStore } from "@/store/authStore";

export function useStartApp() {
  // 获取所有的dict，写入store里
  const getDict = useDictStore((state) => state.getDict);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      getDict();
    }
  }, [token]);
}
