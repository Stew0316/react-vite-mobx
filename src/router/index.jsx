import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  
} from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Route } from 'react-router'
import  useAuth  from '@/hooks/auth'
import App from "@/views/App";
import Login from "@/views/auth/Login";
import Home from "@/views/home/Home";
import Index from '@/views/index/Index'
import Clock from '@/views/others/Clock'
import People from '@/views/person/People'
import Tree from "@/views/others/Tree"
import EchartsMask from "@/views/echarts/EchartsMask";
import Business from "@/views/business/Business"
import MenuSet from "@/views/system/MenuSet"
import Role from "@/views/permission/Role"
import Account from "@/views/system/Account"
import Dict from "@/views/system/Dict";
import Users from '@/views/system/Users'
import Map from "@/views/index/Map";
import Error404 from "@/views/error/404";
import Error403 from "@/views/error/403";
// const route = [
//   {
//     path: "/",
//     lazy: () => import("../views/App"),
//     // element: <App></App>,
//   },
// test1111
// ]
// 用来做路由守卫，判断是否登录并且充定向
const PrivateRoute = ({ children }) => {
  /**
   * useAuth未完成
   * 当前设想是通过token判断是否登录，如果使用了refreshtoken，则需要判断token是否过期，如果过期就跳转登录页，如果没有过期就跳转首页
   * 需要添加nprogress进度条，有toke的时候显示进度条登录，成功跳转，失败则返回登录页
   * auth数据是ai生成，需要更改，当前只是为了验证路由拦截
   * */ 
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
      <Route path="menuSet" element={<MenuSet />}></Route>
      <Route path="role" element={<Role />}></Route>
      <Route path="account" element={<Account />}></Route>
      <Route path="dict" element={<Dict />}></Route>
      <Route path="users" element={<Users />}></Route>
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
  basename: import.meta.env.VITE_BASE_NAME
});
export default router