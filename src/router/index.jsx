import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,

} from "react-router-dom";
import { LOCAL_ENV } from "@/common/localData"
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Route } from 'react-router'
import useAuth from '@/hooks/auth'
import App from "@/views/App";
import Login from "@/views/auth/Login";
import Home from "@/views/home/Home";
import Index from '@/views/index/Index'
import Clock from '@/views/others/Clock'
import People from '@/views/person/People'
import Tree from "@/views/others/Tree"
import EchartsMask from "@/views/echarts/EchartsMask";
import Business from "@/views/business/Business"
import Map from "@/views/index/map";
import Error404 from "@/views/error/404";
import Error403 from "@/views/error/403";
import DynamicOutlet from "./DynamicOutlet";

// 用来做路由守卫，判断是否登录并且充定向
const PrivateRoute = ({ children }) => {
  /**
   * 使用auth拦截
   * 待完善，需要做一个动态路由
   */
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate('/', {
        replace: true,
        state: { from: location.pathname }
      });
    }
  }, [auth]);

  return auth ? children : null;
};
const route = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Login />} />
    <Route path="home" element={
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    }>
      <Route index element={<Map />}></Route>
      <Route path="echartsMask" element={<EchartsMask />}></Route>
      <Route path="business" element={<Business />}></Route>
      <Route path="*" element={<DynamicOutlet />}></Route>
    </Route>
    <Route path="others" lazy={() => import("../views/others/Others")}>
      <Route index element={<Clock />}></Route>
      <Route path='tree' element={<Tree />}></Route>
    </Route>
    <Route path="people" element={<People />}></Route>
    <Route path="403" element={<Error403 />}></Route>
    <Route path="*" element={<Error404 />}></Route>
  </Route>
)
const router = createBrowserRouter(route, {
  basename: LOCAL_ENV.VITE_BASE_NAME
});
export default router