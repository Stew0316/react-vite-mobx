import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
export default createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
]);