import axios from "axios";
import { message } from "antd";
import { LOCAL_ENV } from "@/common/localData";
import router from "@/router/index";
import { X_Tenant_Id } from "@/constant/storage";
const service = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  timeout: 60000,
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_ENV.VITE_MAIN_KEY + "-token");
    if (token) {
      config.headers.authorization = token;
    }
    const tenantId = sessionStorage.getItem(X_Tenant_Id);
    if (tenantId) {
      config.headers[X_Tenant_Id] = tenantId;
    }
    return config;
  },
  (err) => {
    err.message = "服务器异常，请联系管理员！";
    // 错误抛到业务代码
    return Promise.reject(err);
  },
);

service.interceptors.response.use(
  (response) => {
    if (response.data.code == 401) {
      localStorage.removeItem(LOCAL_ENV.VITE_MAIN_KEY + "-token");
      router.navigate("/");
      return;
    }
    if (response.config.responseType == "blob") {
      return response;
    }
    if (response.data.code == 200) {
      return response.data.data;
    }
    if (response.status != 200) {
      if (!response.config.noMessage) {
        message.error(response.data.message);
      }
      return Promise.reject(response.data);
    }

    if (!response.config.cancelMessage) {
      message.error(response.data.message);
    }

    return Promise.reject(response.data);
  },
  (err) => {
    console.log("err", err);
    message.error(err.message || JSON.stringify(err));
    err.message = "请求超时或服务器异常，请检查网络或联系管理员！";
    return Promise.reject(err);
  },
);

export default service;
