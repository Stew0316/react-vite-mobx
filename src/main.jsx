import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'antd/dist/reset.css';
import {
  RouterProvider,
} from "react-router-dom";
import router from './router/index'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

    <RouterProvider router={router} />
  
)
