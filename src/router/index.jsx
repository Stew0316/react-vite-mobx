import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  
} from "react-router-dom";
import { Route } from 'react-router'
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
// const route = [
//   {
//     path: "/",
//     lazy: () => import("../views/App"),
//     // element: <App></App>,
//   },

// ]
const route = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Login />} />
    <Route path="home" element={<Home />} >
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
  </Route>
)
const router = createBrowserRouter(route, {
  basename: import.meta.env.VITE_BASE_NAME
});
export default router