import { useState, useEffect } from "react";
import { LOCAL_ENV } from "@/common/localData";
function useAuth() {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    let data = localStorage.getItem(`${LOCAL_ENV.VITE_MAIN_KEY}-token`);
    setAuth(data);
  }, []); // 依赖为空，表示仅在组件挂载时运行

  return auth;
}

export default useAuth;
