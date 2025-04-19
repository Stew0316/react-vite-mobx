import axios from "axios";
import { message } from "antd";
import { LOCAL_ENV } from "@/common/localData";
import { createBrowserHistory } from "history";

const service = axios.create({
  baseURL: LOCAL_ENV.VITE_API,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
  timeout: 60000,
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_ENV.VITE_MAIN_KEY + "-token");
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  (err) => {
    err.message = "服务器异常，请联系管理员！";
    // 错误抛到业务代码
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (response) => {
    const history = createBrowserHistory();
    if (response.status != 200) {
      if (!response.config.noMessage) {
        message.error(response.data.msg);
      }
      return Promise.reject(err);
    }
    if (response.config.responseType == "blob") {
      return response;
    }
    if (response.data.code == 401) {
      localStorage.removeItem(LOCAL_ENV.VITE_MAIN_KEY + "-token");
      history.replace(LOCAL_ENV.VITE_BASE_NAME + "/");
      return;
    }
    if (response.data.code == 200) {
      return response.data.data;
    }
    if (!response.config.cancelMessage) {
      message.error(response.data.msg);
    }

    return Promise.reject(response.data);
  },
  (err) => {
    message.error(err.message || JSON.stringify(err));
    err.message = "请求超时或服务器异常，请检查网络或联系管理员！";
    return Promise.reject(err);
  }
);

export default service;
