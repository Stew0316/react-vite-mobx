import { useState, useEffect } from "react";

function useAuth() {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    let data = localStorage.getItem(`${import.meta.env.VITE_MAIN_KEY}-token`);
    setAuth(data);
  }, []); // 依赖为空，表示仅在组件挂载时运行

  return auth;
}

export default useAuth;
