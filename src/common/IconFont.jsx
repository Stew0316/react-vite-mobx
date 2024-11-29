import { createFromIconfontCN } from "@ant-design/icons";
import { LOCAL_ENV } from "@/common/localData";
export const ICON_CODE = createFromIconfontCN({
  scriptUrl: [
    // process.env.REACT_APP_ICON_URL
    LOCAL_ENV.VITE_ICON_URL,
  ],
});
