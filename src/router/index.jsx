import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Route } from 'react-router'
import App from "@/views/App";
const route = [
  {
    path: "/",
    lazy: () => import("../views/App"),
    // element: <App></App>,
  },

]
// const route = createRoutesFromElements(
//   <Route path="/" element={<App />}>
//     <Route path="Login" index lazy={() => import("@/views/auth/Login")} />
//   </Route>
// )
const router = createBrowserRouter(route, {
  basename: import.meta.env.VITE_BASE_NAME
});
export default router